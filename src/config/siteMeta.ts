const author = 'Ahmed El Gabri'
const title = 'Software Engineer'

export default {
	title,
	author,
	siteUrl: 'https://gabri.me',
	description: `${author} is a ${title} specialises in frontend & like to bring structure where it is lacking, systematizing information & automating processes.`,
	social: {
		email: {
			display: 'ahmed@gabri.me',
			url: 'mailto:ahmed+contact@gabri.me?subject=Hi!&body=👋🏼',
		},
		twitter: {
			name: 'twitter/X',
			display: '@ahmedelgabri',
			url: 'http://twitter.com/ahmedelgabri',
		},
		// mastodon: {
		// 	display: '@gabri@mastodon.online',
		// 	url: 'https://mastodon.online/@gabri',
		// },
		github: {
			display: 'ahmedelgabri',
			url: 'https://github.com/ahmedelgabri',
		},
		linkedin: {
			display: 'ahmedelgabri',
			url: 'https://www.linkedin.com/in/ahmedelgabri/',
		},
		resume: {
			display: 'Resume',
			url: 'https://docs.google.com/document/d/1sxu8gQi_vyz_RnDNTb6qJy3o9cth6_DzAI2zE_HHSnQ/export?format=pdf',
		},
	},
	twitterId: '1512909779',
	talks: {
		AmsterdamJS: ['http://bit.ly/amsterdamjs-codemods', 'xGjSMbks9vA'],
	},
	interviews: {
		ahmedelemam: [
			'Staff Engineering path',
			'https://www.youtube.com/live/jOW1bj9_HFA?feature=shared',
		],
		devtomanager: [
			'Developer to manager blog interview',
			'https://devtomanager.com/interviews/ahmed-el-gabri/',
		],
		nullplusplus: [
			'Technical Leadership',
			'https://nullplus.plus/episodes/episode45-technical-leadership-with-ahmed-el-gabri',
		],
	},
}
