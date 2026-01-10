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
			cdn: 'https://esm.sh/',
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
	],
	theme: {
		font: {
			mono: '"PragmataPro Liga", "PragmataPro", "Iosevka", "Iosevka Term", "IBM Plex Mono", Inconsolata, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		},
	},
	rules: [['w-content', {width: 'min(80ch, 100%)'}]],
})
