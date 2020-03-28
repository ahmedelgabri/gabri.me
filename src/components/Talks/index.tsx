import * as React from 'react'
import YouTube from '../YouTube'

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
        {Object.keys(talks).map((talk) => {
          const [slides, video] = talks[talk]

          return (
            <li key={talk}>
              <span>{talk}</span>{' '}
              {slides && (
                <a
                  css={{fontSize: '0.75em'}}
                  href={slides}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Slides
                </a>
              )}{' '}
              {video && (
                <React.Fragment>
                  <a
                    css={{fontSize: '0.75em'}}
                    href={`https://www.youtube.com/watch?v=${video}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setState(() => ({showVideo: video}))
                    }}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Video
                  </a>
                </React.Fragment>
              )}
              {state.showVideo === video && <YouTube id={video} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
