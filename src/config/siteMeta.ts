const author = 'Ahmed El Gabri'
const title = 'Software Engineer'

export default {
	title,
	author,
	siteUrl: 'https://gabri.me',
	description: `${author} is an experienced software engineer and technical leader across Product, Platform and Developer Experience. I focus on clarity, maintainability, and helping teams and individuals grow steadily over time.`,
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
			url: 'https://x.com/ahmedelgabri',
		},
		// mastodon: {
		// 	display: '@gabri@mastodon.online',
		// 	url: 'https://mastodon.online/@gabri',
		// },
		resume: {
			display: 'Resume',
			url: 'https://ahmed.gabri.me',
		},
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
				"A git custom command that enhances Git's native worktree functionality with interactive features, automation, and repository migration capabilities.",
		},
		{
			name: 'ccpeek',
			url: 'https://github.com/ahmedelgabri/ccpeek',
			description: 'Explore your Claude Code history, locally.',
		},
		{
			name: 'tmux-agent-panel',
			url: 'https://github.com/ahmedelgabri/tmux-agent-panel',
			description:
				'tap — agent-aware tmux pane picker with live Claude Code/Codex/pi status.',
		},
		{
			name: 'pele-cli',
			url: 'https://github.com/ahmedelgabri/pele-cli',
			description:
				'Command-line interface for Pele: validate Mermaid diagrams and render them to themeable SVG.',
		},
	],
	twitterId: '1512909779',
}
