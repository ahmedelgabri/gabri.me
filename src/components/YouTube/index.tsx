import * as React from 'react'

export interface Props {
	id: string
}

export default function YouTube(props: Props) {
	const {id} = props

	return (
		<div
			css={{
				position: 'relative',
				paddingBottom: '56.25%', // 16:9
				paddingTop: '25px',
				height: 0,
			}}
		>
			<iframe
				css={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				}}
				width="560"
				height="315"
				src={`https://www.youtube.com/embed/${id}?rel=0`}
				frameBorder="0"
				allowFullScreen
			/>
		</div>
	)
}
