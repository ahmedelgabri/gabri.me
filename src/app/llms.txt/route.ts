import {compareDesc} from 'date-fns'
import {getAllPosts} from '../../lib/content'
import siteMeta from '../../config/siteMeta'

export const dynamic = 'force-static'

export async function GET(req: Request) {
	const {author, siteUrl, description, social, talks, interviews} = siteMeta

	const allPosts = await getAllPosts()
	const sortedPosts = allPosts.sort(({date: a}, {date: b}) =>
		compareDesc(new Date(a), new Date(b)),
	)

	const lines: string[] = [
		`# ${author}`,
		'',
		`> ${description}`,
		'',
		'## About',
		'',
		'Software engineer with 15+ years of experience across Product, Platform, and Developer Experience. I focus on clarity, maintainability, and helping teams and individuals grow steadily over time.',
		'',
		'Principal Engineer at [Miro](https://miro.com), Amsterdam.',
		'',
		'## Contact',
		'',
		`- GitHub: [${social.github.display}](${social.github.url})`,
		`- LinkedIn: [${social.linkedin.display}](${social.linkedin.url})`,
		`- ${social.twitter.name}: [${social.twitter.display}](${social.twitter.url})`,
		`- Email: [${social.email.display}](${social.email.url})`,
		`- [${social.resume.display}](${social.resume.url})`,
		'',
		'## Talks & Interviews',
		'',
		`- 2024-03-03: [Staff Engineering path (Arabic)](${interviews.ahmedelemam[1]})`,
		`- 2021-01-23: [Null++ Podcast (Arabic)](${interviews.nullplusplus[1]})`,
		`- 2018-12-17: [DevToManager Interview](${interviews.devtomanager[1]})`,
		`- 2017-06-08: [Automating front-end refactoring](https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}) ([slides](${talks.AmsterdamJS[0]}))`,
		'',
		'## Blog',
		'',
		...sortedPosts.map(
			(post) =>
				`- ${post.formattedDate}: [${post.title}](${siteUrl}${post.url})`,
		),
		'',
	]

	const headers = new Headers(req.headers)

	headers.set(
		'Cache-Control',
		'public, s-maxage=1200, stale-while-revalidate=600',
	)
	headers.set('Content-Type', 'text/plain; charset=utf-8')

	return new Response(lines.join('\n'), {headers})
}
