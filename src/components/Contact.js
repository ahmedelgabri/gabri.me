// @flow
import React from 'react'
import cxs from 'cxs'
import twitter from '../../public/img/twitter.svg'
import github from '../../public/img/github.svg'
import email from '../../public/img/email.svg'
import resume from '../../public/img/resume.svg'
// import { logEvent } from '../lib/analytics'
const logEvent = () => {}
const icons = {
  twitter,
  github,
  email,
  resume,
}

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
  img: icon =>
    cxs({
      verticalAlign: 'middle',
      maxWidth: icon === 'resume' ? 16 : 24,
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
            <img className={s.img(site)} src={icons[site]} alt="" />
          </a>
        </li>
      )}
    </ul>
  </div>
