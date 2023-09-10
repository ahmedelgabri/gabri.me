const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				myBlue: {
					300: '#0074D9',
					400: '#0035f5',
				},
			},
			borderWidth: {
				my: '1rem',
			},
			width: {
				my: '65ch',
			},
			fontFamily: {
				serif: [
					'var(--font-playfair-display)',
					...defaultTheme.fontFamily.serif,
				],
				sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
				mono: [
					'"PragmataPro Liga", "PragmataPro", "Iosevka", "Iosevka Term", "IBM Plex Mono", Inconsolata',
					...defaultTheme.fontFamily.mono,
				],
			},

			fontSize: {
				tiny: '.5rem',
				...defaultTheme.fontSize,
			},
		},
	},
}
