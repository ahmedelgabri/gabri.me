// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import { css } from 'emotion'

export default ({ talks = {} }) =>
  <div>
    <h2>Talks</h2>
    {Object.keys(talks).map(talk => {
      const [slides, video] = talks[talk]
      return (
        <div key={talk}>
          <h3
            css={`
            font-size: 1rem;
            font-weight: normal;
            margin-bottom: .5em;
          `}
          >
            {talk}{' '}
            {slides &&
              <a
                css={`font-size: .75em`}
                href={slides}
                onClick={() => logEvent('Talk', `${talk} slides`)}
                target="_blank"
                rel="noreferer noopener"
              >
                Slides
              </a>}
          </h3>
          {video &&
            <div
              css={`
                position: relative;
                padding-bottom: 56.25%; /* 16:9 */
                padding-top: 25px;
                height: 0;
              `}
            >
              <iframe
                css={`
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                `}
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
