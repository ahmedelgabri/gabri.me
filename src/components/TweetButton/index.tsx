import siteMeta from '../../config/siteMeta'

const {
	social: {twitter},
} = siteMeta

export interface Props {
	via: string
	title: string
	url: string
}

export default function TweetButton({via, title, url}: Props) {
	return (
		<div className="my-8 border-t border-neutral-300 pt-8 text-sm dark:border-neutral-700">
			You can{' '}
			<a
				href={`https://twitter.com/share?url=${url}&via=${via.slice(1)}&text=${title}`}
				rel="noopener noreferrer"
				target="_blank"
			>
				tweet
			</a>{' '}
			this post or reach out to me on{' '}
			<a href={twitter.url} rel="noopener noreferrer" target="_blank">
				{twitter.display}
			</a>
			.
		</div>
	)
}
