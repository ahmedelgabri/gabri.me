const path = require('path')

module.exports = {
	extends: ['@ahmedelgabri/eslint-config/full'],
	parserOptions: {
		project: path.resolve(__dirname, './tsconfig.json'),
	},
	rules: {
		'@typescript-eslint/indent': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/prefer-default-export': 'off',
	},
}
