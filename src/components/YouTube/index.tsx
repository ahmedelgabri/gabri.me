import * as React from 'react'

export interface Props {
	id: string
	title?: string
}

export default function YouTube(props: Props) {
	const {id, title} = props

	return (
		<div
			className="zj-youtube"
			style={{
				paddingBottom: '56.25%', // 16:9
				paddingTop: '1.5625rem',
			}}
		>
			<iframe
				width="560"
				height="315"
				title={title || id}
				src={`https://www.youtube.com/embed/${id}?rel=0`}
				allowFullScreen
			/>
		</div>
	)
}
