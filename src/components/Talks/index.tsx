import * as React from 'react'
import {logEvent} from '../../utils/analytics'

export interface Props {
  talks: ActivityT
}

export default function Talks(props: Props) {
  const [state, setState] = React.useState({showVideo: ''})
  const {talks = {}} = props

  return (
    <div>
      <h2 css={{fontWeight: 500}}>Talks</h2>

      <ul
        css={{
          lineHeight: 1.5,
          paddingLeft: '0.5rem',
          '@media screen and (min-width: 48em)': {
            paddingLeft: 0,
          },
        }}
      >
        {Object.keys(talks).map(talk => {
          const [slides, video] = talks[talk]

          return (
            <li key={talk}>
              <span>{talk}</span>{' '}
              {slides && (
                <a
                  css={{fontSize: '0.75em'}}
                  href={slides}
                  onClick={() => logEvent('Talk', `${talk} slides`)}
                  target="_blank"
                  rel="noreferer noopener"
                >
                  Slides
                </a>
              )}{' '}
              {video && (
                <React.Fragment>
                  <a
                    css={{fontSize: '0.75em'}}
                    href={`https://www.youtube.com/watch?v=${video}`}
                    onClick={e => {
                      e.preventDefault()
                      setState(() => ({showVideo: video}))
                      logEvent('Talk', `${talk} video`)
                    }}
                    target="_blank"
                    rel="noreferer noopener"
                  >
                    Video
                  </a>
                </React.Fragment>
              )}
              {state.showVideo === video && (
                <div
                  css={{
                    position: 'relative',
                    paddingBottom: '56.25%', // 16:9
                    paddingTop: '25px',
                    height: 0,
                  }}
                >
                  <iframe
                    css={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
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
