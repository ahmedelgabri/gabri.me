/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'var(--font-inter)',
					'ui-sans-serif',
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'"Noto Sans"',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"',
					'"Noto Color Emoji"',
				],
				serif: [
					'var(--font-playfair-display)',
					'ui-serif',
					'Georgia',
					'Cambria',
					'"Times New Roman"',
					'Times',
					'serif',
				],
				mono: [
					'"PragmataPro Liga"',
					'"PragmataPro"',
					'"Iosevka"',
					'"Iosevka Term"',
					'"IBM Plex Mono"',
					'Inconsolata',
					'ui-monospace',
					'SFMono-Regular',
					'Menlo',
					'Monaco',
					'Consolas',
					'"Liberation Mono"',
					'"Courier New"',
					'monospace',
				],
			},
			width: {
				my: '65ch',
			},
			fontSize: {
				tiny: '.5rem',
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						'--tw-prose-body': theme('colors.slate[700]'),
						'--tw-prose-headings': theme('colors.slate[900]'),
						'--tw-prose-links': theme('colors.slate[900]'),
						'--tw-prose-bold': theme('colors.slate[900]'),
						'--tw-prose-code': theme('colors.slate[900]'),
						'--tw-prose-pre-bg': theme('colors.slate[100]'),
					},
				},
				invert: {
					css: {
						'--tw-prose-body': theme('colors.slate[400]'),
						'--tw-prose-headings': theme('colors.slate[100]'),
						'--tw-prose-links': theme('colors.slate[100]'),
						'--tw-prose-bold': theme('colors.slate[100]'),
						'--tw-prose-code': theme('colors.slate[100]'),
						'--tw-prose-pre-bg': theme('colors.zinc[800]'),
					},
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
