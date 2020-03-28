import * as React from 'react'
import {GoMarkGithub, GoMail} from 'react-icons/go'
import {
  AiOutlineTwitter,
  AiFillLinkedin,
  AiOutlineFileText,
} from 'react-icons/ai'

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
                {<Comp />}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
