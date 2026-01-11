import {Tweet as ReactTweet} from 'react-tweet'

interface Props {
	id: string
}

export default function Tweet({id}: Props) {
	return (
		<div className="my-6 flex justify-center">
			<ReactTweet id={id} />
		</div>
	)
}
