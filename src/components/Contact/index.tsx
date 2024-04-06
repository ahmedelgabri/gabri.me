'use client'

import * as React from 'react'
import cn from 'clsx'
import {FaGithub, FaMastodon} from 'react-icons/fa'
import {GoMail} from 'react-icons/go'
import {FaSquareXTwitter} from 'react-icons/fa6'
import {AiFillLinkedin, AiOutlineFileText} from 'react-icons/ai'
import {useTheme} from '../../hooks'

export interface Props {
	social: SocialT
}

const iconsMap = {
	github: FaGithub,
	email: GoMail,
	twitter: FaSquareXTwitter,
	linkedin: AiFillLinkedin,
	resume: AiOutlineFileText,
	mastodon: FaMastodon,
}

export default function Contact({social}: Props) {
	const {theme} = useTheme()

	return (
		<div>
			<ul className="flex flex-wrap justify-start">
				{Object.entries(social).map(([site, {url, name}]) => {
					// @ts-ignore
					const Comp = iconsMap[site] || site

					return (
						<li key={site}>
							<a
								href={url}
								rel="noopener noreferrer me"
								target="_blank"
								className={cn(
									'mr-4 flex items-center border-none p-2 text-sm leading-relaxed hover:bg-transparent hover:text-slate-400',
									{
										// @TODO: CSS custom props instead to prevent this from being a client component
										'text-gray-600': theme === 'dark',
									},
								)}
							>
								<Comp className="mr-1" /> {name || site}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
