import * as React from 'react'
import {logEvent} from '../../utils/analytics'

export interface Props {
  interviews: ActivityT
}

export default function Interviews(props: Props) {
  const {interviews = {}} = props

  return (
    <div>
      <h2 css={{fontWeight: 500}}>Interviews</h2>

      <ul
        css={{
          lineHeight: 1.5,
          paddingLeft: '0.5rem',
          '@media screen and (min-width: 48em)': {
            paddingLeft: 0,
          },
        }}
      >
        {Object.entries(interviews).map(([key, [title, url]]) => {
          return (
            <li key={key}>
              <a
                css={{fontSize: '0.75em'}}
                href={url}
                onClick={() => logEvent('Interview', `${title}`)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
