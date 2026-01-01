'use client'

import cn from 'clsx'
import {useTheme} from '../../hooks'

export interface Props {
	social: SocialT
}

const iconsMap = {
	github: 'i-tabler:brand-github',
	email: 'i-tabler:mail',
	twitter: 'i-tabler:brand-x',
	linkedin: 'i-tabler:brand-linkedin',
	resume: 'i-tabler:file-text-filled',
	mastodon: 'i-tabler:brand-mastodon',
	bluesky: 'i-tabler:brand-bluesky',
} as const

export default function Contact({social}: Props) {
	const {theme} = useTheme()

	return (
		<div>
			<ul className="flex flex-wrap justify-start">
				{Object.entries(social).map(([site, {url, name}]) => {
					return (
						<li key={site}>
							<a
								href={url}
								rel="noopener noreferrer me"
								target="_blank"
								className={cn(
									'mr-4 items-center border-none p-2 text-sm leading-relaxed hover:bg-transparent hover:text-slate-400',
									{
										// @TODO: CSS custom props instead to prevent this from being a client component
										'text-gray-600': theme === 'dark',
									},
								)}
							>
								{/* @ts-expect-error */}
								<i className={cn(iconsMap[site], 'mr-1')} />
								{name || site}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
