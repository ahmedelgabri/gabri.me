import React, { PropTypes } from 'react'
import cxs from 'cxs'
import data from '../data.json'

const s = {
  list: cxs({
    margin: 0,
    padding: 0
  }),
  item: cxs({
    display: 'inline-block',
    marginRight: '1rem'
  })
}

export default ({ social = data.social }) =>
  <div role='contentinfo'>
    <ul className={s.list}>
      {Object.keys(social).map(site => {
        return (
          <li key={site} className={s.item}>
            <a href={social[site]} rel='me' target='_blank'>{site}</a>
          </li>
        )
      })}
    </ul>
  </div>
