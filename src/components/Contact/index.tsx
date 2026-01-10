export interface Props {
	social: SocialT
}

const icons: Record<string, string> = {
	github: 'i-tabler:brand-github',
	email: 'i-tabler:mail',
	twitter: 'i-tabler:brand-x',
	linkedin: 'i-tabler:brand-linkedin',
	mastodon: 'i-tabler:brand-mastodon',
	bluesky: 'i-tabler:brand-bluesky',
}

export default function Contact({social}: Props) {
	return (
		<ul className="flex flex-wrap gap-4 text-sm">
			{Object.entries(social).map(([site, {url, name}]) => (
				<li key={site}>
					<a href={url} rel="noopener noreferrer me" target="_blank">
						<i
							className={`${icons[site] || 'i-tabler:link'} mr-1 inline-block align-[-2px]`}
						/>
						{name || site}
					</a>
				</li>
			))}
		</ul>
	)
}
