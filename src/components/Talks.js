// @flow
import React from 'react'
import cxs from 'cxs'
import { logEvent } from '../utils/analytics'

const s = {
  section: cxs({
    '@media screen and (min-width: 65em)': {
      opacity: 0.3,
      transition: 'opacity .2s linear',
      ':hover': {
        opacity: 1,
      },
    },
  }),
  list: cxs({
    lineHeight: 1.5,
    paddingLeft: '.5rem',
    '@media screen and (min-width: 48em)': {
      paddingLeft: 0,
    },
  }),
}

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
