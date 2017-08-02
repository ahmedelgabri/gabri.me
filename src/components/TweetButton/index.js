// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import icon from '../../../public/img/twitter-btn.svg'
import s from './tweetbutton.module.css'

export default ({ via, title, url }) =>
  <div className={s.wrap}>
    <a
      className={s.btn}
      onClick={() => logEvent('Tweet', title)}
      href={`https://twitter.com/share?url=${url}&via=${via.slice(
        1
      )}&text=${title}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i className={s.icon}>
        <img src={icon} alt="" />
      </i>
      <span className={s.label}>Tweet</span>
    </a>
  </div>
