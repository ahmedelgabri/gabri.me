import * as React from 'react'
import cn from 'classnames'
import {GoMarkGithub, GoMail} from 'react-icons/go'
import {
	AiOutlineTwitter,
	AiFillLinkedin,
	AiOutlineFileText,
} from 'react-icons/ai'
import {useTheme} from '../../hooks'

export interface Props {
	social: SocialT
}

const iconsMap = {
	github: GoMarkGithub,
	email: GoMail,
	twitter: AiOutlineTwitter,
	linkedin: AiFillLinkedin,
	resume: AiOutlineFileText,
}

export default function Contact({social}: Props) {
	const {theme} = useTheme()

	return (
		<div>
			<ul className="flex flex-wrap justify-start">
				{Object.entries(social).map(([site, {url}]) => {
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
										'text-gray-600': theme === 'dark',
									},
								)}
							>
								<Comp className="mr-1" /> {site}
							</a>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
