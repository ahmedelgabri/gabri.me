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
	rules: [
		['w-my', {width: '65ch'}],
		[
			'font-serif',
			{
				'font-family':
					'var(--font-playfair-display), ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
			},
		],
		[
			'font-sans',
			{
				'font-family':
					'var(--font-inter), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
			},
		],
		[
			'font-mono',
			{
				'font-family':
					'"PragmataPro Liga", "PragmataPro", "Iosevka", "Iosevka Term", "IBM Plex Mono", Inconsolata, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
			},
		],
		['text-tiny', {'font-size': '.5rem'}],
	],
})
