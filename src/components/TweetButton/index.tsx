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
		<div className="mt-8 border-t border-gray-700 pt-8">
			You can{' '}
			<i className="i-tabler:brand-x inline-block fill-black dark:fill-white" />{' '}
			<a
				href={`https://twitter.com/share?url=${url}&via=${via.slice(
					1,
				)}&text=${title}`}
				rel="noopener noreferrer"
				target="_blank"
			>
				tweet
			</a>{' '}
			this post or reach out directly to me{' '}
			<a href={twitter.url} rel="noopener noreferrer" target="_blank">
				{twitter.display}
			</a>
			.
		</div>
	)
}
