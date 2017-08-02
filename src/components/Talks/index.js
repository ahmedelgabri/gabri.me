// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import s from './talks.module.css'

export default ({ talks = {} }) =>
  <div className={s.section}>
    <h2>Talks</h2>
    <ul>
      {Object.keys(talks).map(talk => {
        const [slides, video] = talks[talk]
        return (
          <li key={talk}>
            {talk} {'- '}
            {video &&
              <a
                href={video}
                onClick={() => logEvent('Talk', `${talk} video`)}
                target="_blank"
                rel="noreferer noopener"
              >
                Video
              </a>}
            {video && ' - '}
            {slides &&
              <a
                href={slides}
                onClick={() => logEvent('Talk', `${talk} slides`)}
                target="_blank"
                rel="noreferer noopener"
              >
                Slides
              </a>}
          </li>
        )
      })}
    </ul>
  </div>
