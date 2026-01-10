import Link from 'next/link'
import {compareDesc} from 'date-fns'
import {getAllPosts} from '../lib/content'
import Header from '../components/Header'
import Contact from '../components/Contact'
import List from '../components/List'
import Footer from '../components/Footer'
import H from '../components/Prose/H'
import siteMeta from '../config/siteMeta'

const {social, talks, interviews} = siteMeta

export default async function Index() {
	const allPosts = await getAllPosts()
	const posts = allPosts.sort(({date: a}, {date: b}) =>
		compareDesc(new Date(a), new Date(b)),
	)

	return (
		<>
			<Header />

			<section className="mb-12">
				<H level="2">about</H>
				<p className="mb-4">
					Software engineer specializing in front-end, with over a decade of
					experience building products and leading teams.
				</p>
				<p className="mb-6">
					Based in Amsterdam, working as Principal Engineer at{' '}
					<a target="_blank" rel="noreferrer noopener" href="https://miro.com">
						Miro
					</a>
					.
				</p>
				<Contact social={social} />
			</section>

			<section className="mb-12">
				<List
					title="talks & interviews"
					posts={[
						{
							date: '2024-03-03',
							item: (
								<Link
									href={interviews.ahmedelemam[1]}
									target="_blank"
									rel="noreferrer noopener"
									className="after:content-['_↗']"
								>
									Staff Engineering path (Arabic)
								</Link>
							),
						},
						{
							date: '2021-01-23',
							item: (
								<Link
									href={interviews.nullplusplus[1]}
									target="_blank"
									rel="noreferrer noopener"
									className="after:content-['_↗']"
								>
									Null++ Podcast (Arabic)
								</Link>
							),
						},
						{
							date: '2018-12-17',
							item: (
								<Link
									href={interviews.devtomanager[1]}
									target="_blank"
									rel="noreferrer noopener"
									className="after:content-['_↗']"
								>
									DevToManager Interview
								</Link>
							),
						},
						{
							date: '2017-06-08',
							item: (
								<>
									<Link
										href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
										target="_blank"
										rel="noreferrer noopener"
										className="after:content-['_↗']"
									>
										Automating front-end refactoring
									</Link>
									{' ('}
									<Link
										href={talks.AmsterdamJS[0]}
										target="_blank"
										rel="noreferrer noopener"
										className="after:content-['_↗']"
									>
										slides
									</Link>
									{')'}
								</>
							),
						},
					]}
				/>
			</section>

			<section className="mb-12">
				<List
					title="blog"
					posts={posts.map((p) => ({
						date: p.formattedDate,
						item: (
							<Link href={p.url} key={p.url}>
								{p.title}
							</Link>
						),
					}))}
				/>
			</section>

			<Footer />
		</>
	)
}
