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
                className={cn('mr-4 hover:text-myBlue-300', {
                  'text-black': theme !== 'dark',
                  'text-white': theme === 'dark',
                })}
              >
                <Comp />
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
