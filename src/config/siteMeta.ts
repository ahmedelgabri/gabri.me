const author = 'Ahmed El Gabri'
const title = 'Software Engineer'

export default {
	title,
	author,
	siteUrl: 'https://gabri.me',
	description: `${author} is a Software engineer with 15+ years of experience across Product, Platform, and Developer Experience. I focus on clarity, maintainability, and helping teams and individuals grow steadily over time.`,
	social: {
		github: {
			display: 'ahmedelgabri',
			url: 'https://github.com/ahmedelgabri',
		},
		linkedin: {
			display: 'ahmedelgabri',
			url: 'https://www.linkedin.com/in/ahmedelgabri/',
		},
		twitter: {
			name: 'twitter',
			display: '@ahmedelgabri',
			url: 'http://twitter.com/ahmedelgabri',
		},
		// mastodon: {
		// 	display: '@gabri@mastodon.online',
		// 	url: 'https://mastodon.online/@gabri',
		// },
		email: {
			display: 'ahmed@gabri.me',
			url: 'mailto:ahmed+contact@gabri.me?subject=Hi!&body=👋🏼',
		},
	},
	projects: [
		{
			name: 'git-wt',
			url: 'https://github.com/ahmedelgabri/git-wt',
			description:
				'A git custom command that enhances Git\'s native worktree functionality with interactive features, automation, and repository migration capabilities.',
		},
		{
			name: 'ccpeek',
			url: 'https://github.com/ahmedelgabri/ccpeek',
			description: 'Explore your Claude Code history, locally.',
		},
	],
	twitterId: '1512909779',
	talks: {
		AmsterdamJS: ['https://amsterdamjs-codemods.surge.sh', 'xGjSMbks9vA'],
	},
	interviews: {
		ahmedelemam: [
			'Staff Engineering path',
			'https://www.youtube.com/live/jOW1bj9_HFA?feature=shared',
		],
		devtomanager: [
			'Developer to manager blog interview',
			'https://web.archive.org/web/20250316193655/https://devtomanager.com/interviews/ahmed-el-gabri/',
		],
		nullplusplus: [
			'Technical Leadership',
			'https://podcasts.apple.com/eg/podcast/episode-45-technical-leadership-with-ahmed-el-gabri/id1493463874?i=1000506332698',
		],
	},
}
