import * as React from 'react'
import {logEvent} from '../../utils/analytics'

export interface Props {
  social: SocialT
}

export default ({social}: Props) => (
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
            onClick={() => logEvent('Social', site)}
          >
            <img
              css={{
                verticalAlign: 'middle',
                width: `${
                  site === 'resume' ? '.75' : site === 'linkedin' ? '1' : '1.2'
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
