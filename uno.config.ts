import {defineConfig, presetWind4} from 'unocss'

export default defineConfig({
	// The design's own styles are unlayered, so they outrank everything Uno
	// emits regardless of specificity. Keeping the reset inside a cascade layer
	// is what makes that hold.
	outputToCssLayers: true,
	presets: [
		presetWind4({
			preflights: {
				reset: true,
			},
			dark: 'class',
		}),
	],
	postprocess: [
		(util) => {
			util.entries.forEach((entry) => {
				const prop = entry[0]
				const value = entry[1]
				if (
					typeof value === 'string' &&
					prop?.includes('border') &&
					value.endsWith('px')
				) {
					const px = parseFloat(value)
					if (!isNaN(px)) {
						entry[1] = `${px / 16}rem`
					}
				}
			})
		},
	],
})
