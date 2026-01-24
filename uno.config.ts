import {defineConfig, presetWind4, presetIcons} from 'unocss'

export default defineConfig({
	presets: [
		presetWind4({
			preflights: {
				reset: true,
			},
			dark: 'class',
		}),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
	],
	theme: {
		font: {
			mono: '"PragmataPro Liga", "PragmataPro", "Iosevka", "Iosevka Term", "IBM Plex Mono", Inconsolata, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			serif:
				'"Iowan Old Style", "Palatino Linotype", "URW Palladio L", P052, ui-serif, serif',
			sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		},
	},
	rules: [['w-content', {width: 'min(70ch, 100%)'}]],
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
