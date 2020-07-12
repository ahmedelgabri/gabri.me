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
      <ul className="text-xs">
        {Object.entries(social).map(([site, {url, display}]) => {
          const Comp = iconsMap[site] || site

          return (
            <li key={site}>
              <a
                href={url}
                rel="noopener noreferrer me"
                target="_blank"
                title={site}
                className={cn('flex items-center hover:text-myBlue-300', {
                  'text-gray-500': theme !== 'dark',
                  'text-gray-700': theme === 'dark',
                })}
              >
                <Comp className="mr-2" /> {display}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
