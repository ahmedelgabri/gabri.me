/*
 * The frame loop the zellij page's animated layers share, and the power signals
 * that decide how much of one they may have.
 *
 * The loop is demand-driven rather than continuous. Nothing on this page moves
 * quickly — the lattice creeps two thirds of a pixel a second — so a layer
 * names the rate it wants and the loop waits on a timer for it, handing the
 * paint itself to one animation frame at the end of the wait. A layer asking
 * for ten frames a second therefore leaves the event loop alone for a tenth of
 * a second, rather than waking on every vsync to decide it has nothing to do.
 *
 * Whether a layer wants frames at all is its own affair: the fixed
 * full-viewport ones answer awake() from theme and focus alone, and the
 * astrolabe feeds it from an IntersectionObserver because it can scroll away.
 * Nothing here draws — the layers own their renderers, and one of them has no
 * renderer at all.
 */

/* A tab coming back from the background hands out one enormous first delta */
const MAX_DELTA = 0.1
/*
 * A frame is allowed to arrive twice as late as it was asked for and still be
 * honoured in full; past that the machine was busy elsewhere and the layer is
 * not owed the whole gap.
 */
const LATE = 2
/* What a layer asks for when it wants every frame the display will give */
export const FULL_RATE = Infinity
/*
 * The timer is set to fire a hair before the frame is due and hands the paint
 * to the next animation frame, so the paint still lands on a vsync.
 */
const LEAD = 4
/* Ornament does not get a full share of a battery that is being drained */
const UNPLUGGED = 0.5

/* One counter per layer, so the throttling can be read off a live page */
export type Counted = 'sky' | 'pencil' | 'astrolabe' | 'plate'

declare global {
	interface Window {
		__zjFrames: Record<Counted, number>
	}
}

/*
 * One integer increment per painted frame. Sample it over a measured wall
 * second and the answer is that layer's real frame rate, whatever the tab,
 * the focus and the battery have decided between them.
 */
const frames: Record<Counted, number> = {
	sky: 0,
	pencil: 0,
	astrolabe: 0,
	plate: 0,
}

window.__zjFrames = frames

/* ————— Power signals: a global multiplier on every ambient budget ————— */

/*
 * A window nobody is looking at cannot be interacted with either, so its
 * layers stop outright rather than slow down. What each does about the gap is
 * its own business: a phase that has to stay registered with something outside
 * itself reads the clock and resumes where it would have been, and one that
 * answers to nothing is simply held where it stood.
 *
 * Note when reading __zjFrames by hand: in most browsers moving focus to the
 * developer tools blurs the page, and the counters will sit still.
 */
let focused = document.hasFocus()
let unplugged = false

const sleepers = new Set<() => void>()

function stir() {
	for (const settle of sleepers) {
		settle()
	}
}

window.addEventListener('focus', () => {
	focused = true
	stir()
})

window.addEventListener('blur', () => {
	focused = false
	stir()
})

document.addEventListener('visibilitychange', stir)

interface Battery {
	charging: boolean
	addEventListener(type: 'chargingchange', listener: () => void): void
}

const getBattery = (
	navigator as Navigator & {getBattery?: () => Promise<Battery>}
).getBattery

getBattery
	?.call(navigator)
	.then((battery) => {
		function read() {
			unplugged = !battery.charging
			stir()
		}

		battery.addEventListener('chargingchange', read)
		read()
	})
	/* No battery API, or a browser that refuses it: the layers run at full ambient */
	.catch(() => undefined)

export interface Layer {
	/*
	 * One step of the layer's own animation; delta is seconds, already clamped.
	 * False when the step left the layer looking exactly as it already does,
	 * which skips the paint entirely.
	 */
	step(delta: number): boolean
	/* Draws whatever the last step arrived at */
	paint(): void
	/* False once there is nothing left to draw, which parks the loop */
	awake(): boolean
	/* Frames a second this layer wants right now, before the power multiplier */
	fps(): number
	/* Which of window.__zjFrames this layer's painted frames are counted in */
	counter: Counted
}

export interface Lifecycle {
	/* Call whenever anything awake() reads may have changed */
	settle(): void
	/*
	 * Every frame the display will give, for this many seconds. For the
	 * interactions a layer cannot see coming: a layer parked on a half-second
	 * timer would answer the first flick of a pointer half a second late.
	 * Interactions the layer can measure — a lens still closing on its target,
	 * a rete still giving up its speed — belong in fps() instead.
	 */
	boost(seconds: number): void
}

/*
 * Runs the layer while the window is being looked at and the layer still wants
 * frames, at whatever rate the layer asks for.
 */
export function createLayerLifecycle(layer: Layer): Lifecycle {
	let request = 0
	let timer = 0
	let running = false
	let last = 0
	/* The wait the pending frame was scheduled on, for the late-frame clamp */
	let planned = 0
	let boosted = 0

	function stop() {
		running = false
		cancelAnimationFrame(request)
		clearTimeout(timer)
	}

	function live(): boolean {
		return focused && document.visibilityState === 'visible' && layer.awake()
	}

	function soon() {
		request = requestAnimationFrame(tick)
	}

	function schedule() {
		const rate =
			performance.now() < boosted
				? FULL_RATE
				: layer.fps() * (unplugged ? UNPLUGGED : 1)

		if (!Number.isFinite(rate)) {
			planned = 0
			soon()
			return
		}

		planned = 1 / rate
		/*
		 * Counted from the last frame rather than from now, so a budget stays a
		 * rate instead of becoming a gap with the paint's own cost added to it.
		 */
		const wait = planned * 1000 - (performance.now() - last) - LEAD
		timer = window.setTimeout(soon, Math.max(wait, 0))
	}

	function tick(now: number) {
		/* A layer asked for one frame a second is not owed a tenth of a second */
		const delta = Math.min(
			(now - last) / 1000,
			Math.max(MAX_DELTA, planned * LATE),
		)
		last = now

		if (layer.step(delta)) {
			layer.paint()
			frames[layer.counter]++
		}

		/* Asked after the frame, so a layer always gets to draw its last one */
		if (!live()) {
			stop()
			return
		}

		schedule()
	}

	function settle() {
		if (!live()) {
			stop()
			return
		}

		if (running) {
			return
		}

		running = true
		last = performance.now()
		planned = 0
		soon()
	}

	function boost(seconds: number) {
		const now = performance.now()

		/*
		 * A layer idling on a half-second timer must not charge that wait to
		 * the interaction that woke it, or a three-tenths cross-fade would be
		 * over in the first frame of it. The animation starts here. Only the
		 * boost that begins the interaction does this: one already under way
		 * is running at the display's rate and its deltas are honest.
		 */
		if (now >= boosted) {
			last = now
		}

		boosted = Math.max(boosted, now + seconds * 1000)

		if (!running) {
			settle()
			return
		}

		/* Whatever the layer was waiting on, it is wanted sooner than that */
		clearTimeout(timer)
		cancelAnimationFrame(request)
		soon()
	}

	sleepers.add(settle)

	return {settle, boost}
}
