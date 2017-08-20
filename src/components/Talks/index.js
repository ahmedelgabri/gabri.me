// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import s from './talks.module.css'

export default ({ talks = {} }) =>
  <div>
    <h2>Talks</h2>
    {Object.keys(talks).map(talk => {
      const [slides, video] = talks[talk]
      return (
        <div key={talk}>
          <h3 className={s.talkTitle}>
            {talk}{' '}
            {slides &&
              <a
                className={s.slides}
                href={slides}
                onClick={() => logEvent('Talk', `${talk} slides`)}
                target="_blank"
                rel="noreferer noopener"
              >
                Slides
              </a>}
          </h3>
          {video &&
            <div className={s.videoWrapper}>
              <iframe
                className={s.iframe}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video}?rel=0`}
                frameBorder="0"
                allowFullScreen
              />
            </div>}
        </div>
      )
    })}
  </div>
