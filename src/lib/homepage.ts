import siteMeta from '../config/siteMeta'

export const summary =
	'Software engineer with 15+ years of experience across Product, Platform, and Developer Experience. I focus on clarity, maintainability, and helping teams and individuals grow steadily over time.'

export const role = {
	title: 'Principal Engineer',
	company: 'Miro',
	companyUrl: 'https://miro.com',
	location: 'Amsterdam',
}

export interface TalkItem {
	date: string
	title: string
	url: string
	slides?: string
}

export const talkItems: TalkItem[] = [
	{
		date: '2024-03-03',
		title: 'Staff Engineering path (Arabic)',
		url: siteMeta.interviews.ahmedelemam[1],
	},
	{
		date: '2021-01-23',
		title: 'Null++ Podcast (Arabic)',
		url: siteMeta.interviews.nullplusplus[1],
	},
	{
		date: '2018-12-17',
		title: 'DevToManager Interview',
		url: siteMeta.interviews.devtomanager[1],
	},
	{
		date: '2017-06-08',
		title: 'Automating front-end refactoring',
		url: `https://www.youtube.com/watch?v=${siteMeta.talks.AmsterdamJS[1]}`,
		slides: siteMeta.talks.AmsterdamJS[0],
	},
]
