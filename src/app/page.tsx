import * as React from 'react'
import Link from 'next/link'
import {compareDesc} from 'date-fns'
import {GoDeviceCameraVideo} from 'react-icons/go'
import {AiFillAudio} from 'react-icons/ai'
import {RiArticleLine} from 'react-icons/ri'
import {allPosts} from 'contentlayer/generated'
import {pick} from 'contentlayer/client'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Contact from '../components/Contact'
import List from '../components/List'
import Footer from '../components/Footer'
import H from '../components/Prose/H'
import siteMeta from '../config/siteMeta'

const {social, talks, interviews} = siteMeta

const posts = allPosts
	.map((p) => pick(p, ['title', 'formattedDate', 'url', 'date']))
	.sort(({date: a}, {date: b}) => compareDesc(new Date(a), new Date(b)))

export default function Index() {
	return (
		<>
			<Layout>
				<Header />
				<H level="2" extra="👋">
					Hi.
				</H>
				<p className="mb-6 text-xl tracking-tight">
					I'm a software engineer, specializing in front-end, with over a decade
					of experience in building products & leading/building teams.
				</p>
				<p className="mb-6 text-xl tracking-tight">
					Currently based in Amsterdam, the Netherlands & working as Staff
					Software Engineer at{' '}
					<a target="_blank" rel="noreferrer noopener" href="http://miro.com">
						Miro
					</a>
					.
				</p>

				<Contact social={social} />
			</Layout>

			<div>
				<Layout>
					<List
						title="Talks & Interviews"
						posts={[
							{
								date: '2021-01-23',
								item: (
									<div className="flex items-center">
										<AiFillAudio title="Podcast" className="mr-2" />
										<div className="mr-2">
											<Link
												href={interviews.nullplusplus[1]}
												target="_blank"
												className="after:content-['_↗'] lg:p-2"
												rel="noreferrer noopener"
											>
												Null++ Podcast (Arabic)
											</Link>
										</div>
									</div>
								),
							},
							{
								date: '2018-12-17',
								item: (
									<div className="flex items-center">
										<RiArticleLine title="Interview" className="mr-2" />
										<div className="mr-2">
											<Link
												href={interviews.devtomanager[1]}
												target="_blank"
												rel="noreferrer noopener"
												className="after:content-['_↗'] lg:p-2"
											>
												DevToManager Interview
											</Link>
										</div>
									</div>
								),
							},
							{
								date: '2017-06-08',
								item: (
									<>
										<div className="flex items-center">
											<GoDeviceCameraVideo
												title="Conference talk"
												className="mr-2"
											/>
											<div className="mr-2">
												<Link
													href={`https://www.youtube.com/watch?v=${talks.AmsterdamJS[1]}`}
													target="_blank"
													rel="noreferrer noopener"
													className="after:content-['_↗'] lg:p-2"
												>
													Automating front-end refactoring
												</Link>
												{' - '}(
												<Link
													href={talks.AmsterdamJS[0]}
													className="after:content-['_↗'] lg:p-2"
													target="_blank"
													rel="noreferrer noopener"
												>
													slides
												</Link>
												)
											</div>
										</div>
									</>
								),
							},
						]}
					/>
				</Layout>
			</div>

			<div>
				<Layout>
					<List
						title="Blog"
						posts={posts.map((p) => ({
							date: p.formattedDate,
							item: (
								<Link href={p.url} key={p.url} className="lg:p-2">
									{p.title}
								</Link>
							),
						}))}
					/>
					<Footer />
				</Layout>
			</div>
		</>
	)
}
