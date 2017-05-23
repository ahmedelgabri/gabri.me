// @flow
import React from 'react'
import cxs from 'cxs'
import data from '../data.json'

const s = {
  list: cxs({
    margin: 0,
    padding: 0,
    listStyle: 'none',
  }),
}

export default ({ social = data.social }) => (
  <div role="contentinfo">
    <ul className={s.list}>
      {Object.keys(social).map(site => {
        return (
          <li key={site}>
            <a
              href={social[site].url}
              rel="me"
              target="_blank"
              data-ga-on="click"
              data-ga-event-category="Social links"
              data-ga-event-action={social[site].url}
            >
              {social[site].display}
            </a>
          </li>
        )
      })}
    </ul>
  </div>
)
