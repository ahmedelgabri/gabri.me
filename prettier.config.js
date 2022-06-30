module.exports = {
	...require('@ahmedelgabri/prettier-config'),
	tailwindConfig: './tailwind.config.js',
	plugins: [require('prettier-plugin-tailwindcss')],
}
