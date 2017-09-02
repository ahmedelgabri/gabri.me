// @flow
import React from 'react'
import cn from 'classnames'
import { logEvent } from '../../utils/analytics'
import s from './contact.module.css'

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
            onClick={() => logEvent('Social', site)}
          >
            <img
              className={cn(s.img, {
                [s.icon16]: site === 'resume',
                [s.icon24]: site !== 'resume',
              })}
              src={`/img/${site}.svg`}
              alt=""
            />
          </a>
        </li>
      )}
    </ul>
  </div>
