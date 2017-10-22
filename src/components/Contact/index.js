// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import { css } from 'emotion'

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
            margin-right: 1rem;
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
                width: ${site === 'resume' ? '1rem' : '1.5rem'};
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
