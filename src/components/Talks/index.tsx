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
      <h2>Talks</h2>

      <ul>
        {Object.keys(talks).map((talk) => {
          const [slides, video] = talks[talk]

          return (
            <li key={talk}>
              <span>{talk}</span>{' '}
              {slides && (
                <a href={slides} target="_blank" rel="noreferrer noopener">
                  Slides
                </a>
              )}{' '}
              {video && (
                <>
                  <a
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
                </>
              )}
              {state.showVideo === video && <YouTube id={video} />}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
