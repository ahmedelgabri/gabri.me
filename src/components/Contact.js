// @flow
import React from 'react'
import cxs from 'cxs'

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
  img: cxs({
    verticalAlign: 'middle',
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
          >
            <img
              className={s.img}
              width={site === 'resume' ? 16 : 24}
              src={`/img/${site}.svg`}
              alt=""
            />
          </a>
        </li>
      )}
    </ul>
  </div>
