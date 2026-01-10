export interface Props {
	social: SocialT
}

export default function Contact({social}: Props) {
	return (
		<ul className="flex flex-wrap gap-4 text-sm">
			{Object.entries(social).map(([site, {url, name}]) => (
				<li key={site}>
					<a href={url} rel="noopener noreferrer me" target="_blank">
						{name || site}
					</a>
				</li>
			))}
		</ul>
	)
}
