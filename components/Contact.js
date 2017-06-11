// @flow
import React from 'react'
import cxs from 'cxs'
import { logEvent } from '../lib/analytics'

const s = {
  list: cxs({
    margin: 0,
    padding: 0,
    listStyle: 'none',
  }),
  item: cxs({
    display: 'inline-block',
    marginRight: '1rem',
  }),
  link: cxs({
    border: 'none',
  }),
}

export default ({ social }) =>
  <div role="contentinfo">
    <ul className={s.list}>
      {Object.keys(social).map(site =>
        <li className={s.item} key={site}>
          <a
            href={social[site].url}
            rel="noopener noreferrer me"
            className={s.link}
            target="_blank"
            onClick={() => logEvent('Social links', social[site].url)}
          >
            <img src={`static/img/${site}.svg`} alt="" width="24" />
          </a>
        </li>
      )}
    </ul>
  </div>
