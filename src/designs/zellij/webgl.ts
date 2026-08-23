/*
 * The plumbing the zellij page's WebGL layers share: the capability probe that
 * runs before anything is downloaded, one three.js import between them all,
 * and the frame loop that parks itself when the tab or the layer goes quiet.
 *
 * Both layers are fixed to the viewport and draw in CSS pixels with y running
 * down the page, so they also share a camera fit. Neither is ever scrolled off
 * screen, which is why there is no IntersectionObserver here.
 */
import type {OrthographicCamera, WebGLRenderer} from 'three'

/*
 * Past two device pixels to the CSS pixel the extra fragments cost real
 * battery and show nothing: every layer here is hairlines and small dots.
 */
const MAX_RATIO = 2
/* A tab coming back from the background hands out one enormous first delta */
const MAX_DELTA = 0.1

export function pixelRatio(): number {
	return Math.min(window.devicePixelRatio || 1, MAX_RATIO)
}

/* Asked before three.js is fetched, so a machine without WebGL downloads nothing */
export function hasWebGL(): boolean {
	try {
		const probe = document.createElement('canvas')
		const context = probe.getContext('webgl2') ?? probe.getContext('webgl')
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

/*
 * The resize dance both layers want. Returns the device-pixel ratio in force,
 * which any shader sizing points in device pixels has to be told about.
 */
export function fitPixels(
	renderer: WebGLRenderer,
	camera: OrthographicCamera,
	width: number,
	height: number,
): number {
	camera.right = width
	camera.bottom = height
	camera.updateProjectionMatrix()
	/* The ratio can change under the window, not only the size */
	renderer.setPixelRatio(pixelRatio())
	renderer.setSize(width, height)
	return renderer.getPixelRatio()
}

export interface Layer {
	/* One step of the layer's own animation; delta is seconds, already clamped */
	frame(delta: number): void
	/* False once there is nothing left to draw, which parks the loop */
	awake(): boolean
}

/*
 * Runs the layer while the tab is visible and the layer still wants frames.
 * Returns the settle: call it whenever either of those may have changed.
 */
export function createLayerLifecycle(layer: Layer): () => void {
	let request = 0
	let running = false
	let last = 0

	function stop() {
		running = false
		cancelAnimationFrame(request)
	}

	function tick(now: number) {
		const delta = Math.min((now - last) / 1000, MAX_DELTA)
		last = now
		layer.frame(delta)

		/* Asked after the frame, so a layer always gets to draw its last one */
		if (!layer.awake()) {
			stop()
			return
		}

		request = requestAnimationFrame(tick)
	}

	function settle() {
		if (document.visibilityState !== 'visible' || !layer.awake()) {
			stop()
			return
		}

		if (running) {
			return
		}

		running = true
		last = performance.now()
		request = requestAnimationFrame(tick)
	}

	document.addEventListener('visibilitychange', settle)

	return settle
}
