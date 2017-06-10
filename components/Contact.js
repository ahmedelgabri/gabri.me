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
  item: cxs({
    display: 'inline-block',
    marginRight: '1rem',
  }),
  link: cxs({
    border: 'none',
  }),
}

export default ({ social = data.social }) =>
  <div role="contentinfo">
    <ul className={s.list}>
      {Object.keys(social).map(site => {
        return (
          <li className={s.item} key={site}>
            <a
              href={social[site].url}
              rel="me noopener noreferer"
              className={s.link}
              target="_blank"
              data-ga-on="click"
              data-ga-event-category="Social links"
              data-ga-event-action={social[site].url}
            >
              <img src={`static/img/${site}.svg`} alt="" width="24" />
            </a>
          </li>
        )
      })}
    </ul>
  </div>
