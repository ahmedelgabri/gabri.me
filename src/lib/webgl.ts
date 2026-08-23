/*
 * The plumbing the zellij page's WebGL layers share: the capability probe that
 * runs before anything is downloaded, one three.js import between them all, and
 * the stage they each draw on — CSS pixels with y running down the page, which
 * is what every constant in those layers is written in.
 *
 * The two cross-cutting behaviours live here too, because all three layers want
 * them and none of them wants a different one: the cross-fade that carries the
 * ink from one theme to the other, and the gate that decides a layer is worth
 * starting at all. What each layer does about a theme change past the fade —
 * settle, boost, or take the new ink whole — is its own business.
 *
 * The frame loop the layers run on is in frames.ts.
 */
import type {OrthographicCamera, Scene, WebGLRenderer} from 'three'

/*
 * The cap is per layer: a full-viewport field of soft dots gains nothing from
 * a second device pixel, where an instrument drawn in hairlines does. Past two
 * the extra fragments cost real battery and show nothing on either.
 */
function pixelRatio(cap: number): number {
	return Math.min(window.devicePixelRatio || 1, cap)
}

let webgl: boolean | null = null

/*
 * Asked before three.js is fetched, so a machine without WebGL downloads
 * nothing. The answer cannot change under a live page, and the probe costs a
 * real context, so it is taken once and remembered.
 */
export function hasWebGL(): boolean {
	webgl ??= probe()
	return webgl
}

function probe(): boolean {
	try {
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
		/* Hand the context back rather than sitting on one of the browser's few */
		context?.getExtension('WEBGL_lose_context')?.loseContext()
		return Boolean(context)
	} catch {
		return false
	}
}

let pending: Promise<typeof import('three')> | null = null

/*
 * Two layers can decide to wake in the same frame; sharing the promise means
 * they share one module evaluation rather than each awaiting their own.
 */
export function loadThree(): Promise<typeof import('three')> {
	pending ??= import('three')
	return pending
}

export interface PixelStage {
	renderer: WebGLRenderer
	scene: Scene
	camera: OrthographicCamera
}

/*
 * A canvas that draws in the page's own pixels: the origin at the top left,
 * y running down, and one unit to one CSS pixel — so a layer's geometry can be
 * written in the same numbers as the CSS it has to land on. The canvas is
 * ornament in every case, so it is hidden from the accessibility tree.
 */
export async function createPixelStage(box: HTMLElement): Promise<PixelStage> {
	const {OrthographicCamera, Scene, WebGLRenderer} = await loadThree()
	const renderer = new WebGLRenderer({alpha: true, antialias: true})
	renderer.domElement.setAttribute('aria-hidden', 'true')

	return {
		renderer,
		scene: new Scene(),
		camera: new OrthographicCamera(
			0,
			box.clientWidth,
			0,
			box.clientHeight,
			-1,
			1,
		),
	}
}

/*
 * The resize dance every layer wants. Returns the device-pixel ratio in force,
 * which any shader sizing points in device pixels has to be told about.
 */
export function fitPixels(
	renderer: WebGLRenderer,
	camera: OrthographicCamera,
	width: number,
	height: number,
	cap: number,
): number {
	camera.right = width
	camera.bottom = height
	camera.updateProjectionMatrix()
	/* The ratio can change under the window, not only the size */
	renderer.setPixelRatio(pixelRatio(cap))
	renderer.setSize(width, height)
	return renderer.getPixelRatio()
}

/* Somewhere between the two ends of a pair, the way every ink here is carried */
export function between(pair: number[], amount: number): number {
	return pair[0] + (pair[1] - pair[0]) * amount
}

export interface ThemeFade {
	/* Where the cross-fade has got to: 0 in the light theme, 1 in the dark */
	readonly amount: number
	/* And where it is going */
	readonly target: number
	/* Moves the fade on by one frame; false when it was already arrived */
	step(delta: number): boolean
	/* Takes the far end whole, for a layer nobody can see cross */
	snap(): void
}

/*
 * The one thing every layer on this page does with the theme: carry its ink
 * across in the given number of seconds. A layer's own reaction to the change —
 * whether it settles, boosts, or has no cross-fade to run at all — is handed
 * back to it, since no two of them want the same one.
 */
export function createThemeFade(
	seconds: number,
	onChange: () => void,
	/* Where to start, for a layer that arrives with nothing drawn yet */
	from?: number,
): ThemeFade {
	let target = window.__zjTheme === 'dark' ? 1 : 0
	let amount = from ?? target

	window.addEventListener('zj:theme', () => {
		target = window.__zjTheme === 'dark' ? 1 : 0
		onChange()
	})

	return {
		get amount() {
			return amount
		},
		get target() {
			return target
		},
		step(delta: number): boolean {
			if (amount === target) {
				return false
			}

			const pace = delta / seconds
			amount =
				target > amount
					? Math.min(amount + pace, target)
					: Math.max(amount - pace, target)

			return true
		},
		snap() {
			amount = target
		},
	}
}

/*
 * The bootstrap the two fixed layers share. Nothing is fetched until every
 * condition for drawing is met — and they arrive in any order, so each one is
 * asked again whenever a query changes its mind — and the first start is the
 * only one. The retry is handed back for whatever else a layer waits on.
 */
export function gateLayer(
	box: HTMLElement,
	queries: MediaQueryList[],
	enhance: (box: HTMLElement) => Promise<unknown>,
	wanted: () => boolean = () => true,
): () => void {
	let started = false

	function open() {
		if (
			started ||
			!wanted() ||
			queries.some((query) => !query.matches) ||
			!hasWebGL()
		) {
			return
		}

		started = true
		/* A refused chunk or context leaves the CSS this layer was to replace */
		enhance(box).catch(() => undefined)
	}

	open()

	for (const query of queries) {
		query.addEventListener('change', open)
	}

	return open
}
