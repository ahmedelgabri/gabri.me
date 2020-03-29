import * as React from 'react'
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
  const iconColor = theme === 'dark' ? {color: 'white'} : {}

  return (
    <div role="contentinfo">
      <ul className="flex items-center justify-between">
        {Object.entries(social).map(([site, {url}]) => {
          const Comp = iconsMap[site] || site

          return (
            <li key={site}>
              <a
                href={url}
                rel="noopener noreferrer me"
                target="_blank"
                title={site}
                className="text-black"
              >
                {<Comp {...iconColor} />}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
