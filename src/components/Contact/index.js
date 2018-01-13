// @flow
import * as React from 'react'
import { css } from 'emotion'
import { logEvent } from '../../utils/analytics'

export default ({ social }) => (
  <div role="contentinfo">
    <ul
      className={css`
        margin: 0;
        padding: 0;
        list-style: none;
      `}
    >
      {Object.keys(social).map(site => (
        <li
          className={css`
            display: inline-block;
            margin-right: 0.75rem;
          `}
          key={site}
        >
          <a
            href={social[site].url}
            rel="noopener noreferrer me"
            className={css`
              border: none;
            `}
            target="_blank"
            onClick={() => logEvent('Social', site)}
          >
            <img
              className={css`
                vertical-align: middle;
                width: ${site === 'resume' ? '.75em' : '1.2em'};
              `}
              src={`/img/${site}.svg`}
              alt=""
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)
