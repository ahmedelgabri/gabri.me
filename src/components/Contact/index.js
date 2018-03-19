// @flow
import * as React from 'react'
import { css } from 'emotion'
import { logEvent } from '../../utils/analytics'

export default ({ social }) => (
  <div role="contentinfo">
    <ul css={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {Object.keys(social).map(site => (
        <li
          css={{
            display: 'inline-block',
            marginRight: '0.75rem',
          }}
          key={site}
        >
          <a
            href={social[site].url}
            rel="noopener noreferrer me"
            css={{ border: 'none' }}
            target="_blank"
            onClick={() => logEvent('Social', site)}
          >
            <img
              css={{ verticalAlign: 'middle', width: `${site === 'resume' ? '.75' : '1.2'}em` }}
              src={`/img/${site}.svg`}
              alt=""
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)
