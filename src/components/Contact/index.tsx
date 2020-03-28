import * as React from 'react'

export interface Props {
  social: SocialT
}

export default function Contact({social}: Props) {
  return (
    <div role="contentinfo">
      <ul css={{margin: 0, padding: 0, listStyle: 'none'}}>
        {Object.entries(social).map(([site, {url}]) => (
          <li
            css={{
              display: 'inline-block',
              marginRight: '0.75rem',
            }}
            key={site}
          >
            <a
              href={url}
              rel="noopener noreferrer me"
              css={{border: 'none'}}
              target="_blank"
              title={site}
            >
              <img
                css={{
                  verticalAlign: 'middle',
                  width: `${
                    site === 'resume'
                      ? '.75'
                      : site === 'linkedin'
                      ? '1'
                      : '1.2'
                  }em`,
                }}
                src={`/img/${site}.svg`}
                alt=""
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
