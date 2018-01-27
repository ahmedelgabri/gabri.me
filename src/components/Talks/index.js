// @flow
import * as React from 'react'
import { css } from 'emotion'
import { logEvent } from '../../utils/analytics'

export default class Talks extends React.Component {
  state = { video: '' }

  constructor(props) {
    super(props)
  }

  render() {
    const { talks = {} } = this.props
    return (
      <div>
        <h2>Sometimes I give talks</h2>

        <ul
          className={css`
            line-height: 1.5;
            padding-left: 0.5rem;
            @media screen and (min-width: 48em) {
              padding-left: 0;
            }
          `}
        >
          {Object.keys(talks).map(talk => {
            const [slides, video] = talks[talk]

            return (
              <li key={talk}>
                <span>{talk} </span>
                {slides && (
                  <a
                    className={css`
                      font-size: 0.75em;
                    `}
                    href={slides}
                    onClick={() => logEvent('Talk', `${talk} slides`)}
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    Slides
                  </a>
                )}

                {video && (
                  <React.Fragment>
                    {' '}
                    <a
                      className={css`
                        font-size: 0.75em;
                      `}
                      href={`https://www.youtube.com/watch?v=${video}`}
                      onClick={e => {
                        e.preventDefault()
                        this.setState(
                          state => ({ showVideo: video }),
                          logEvent('Talk', `${talk} video`),
                        )
                      }}
                      target="_blank"
                      rel="noreferer noopener"
                    >
                      Video
                    </a>
                  </React.Fragment>
                )}
                {this.state.showVideo === video && (
                  <div
                    className={css`
                      position: relative;
                      padding-bottom: 56.25%; /* 16:9 */
                      padding-top: 25px;
                      height: 0;
                    `}
                  >
                    <iframe
                      className={css`
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
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}
