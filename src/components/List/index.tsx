import * as React from 'react'
import H from '../Prose/H'

export default function List(props: {
	title: string
	posts: {date: string; item: React.ReactNode}[]
}) {
	const {title, posts} = props

	return (
		<>
			<H level="3">{title}</H>
			<ul className="space-y-4 md:space-y-2">
				{posts.map(({date, item}, i) => (
					<li key={`${date}-${i}`} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-4">
						<time
							className="shrink-0 text-sm tabular-nums text-neutral-500"
							dateTime={date}
						>
							{date}
						</time>
						{item && <div>{item}</div>}
					</li>
				))}
			</ul>
		</>
	)
}
