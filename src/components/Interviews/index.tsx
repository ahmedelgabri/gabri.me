import * as React from 'react'

export interface Props {
  interviews: ActivityT
}

export default function Interviews(props: Props) {
  const {interviews = {}} = props

  return (
    <div>
      <h2>Interviews</h2>

      <ul>
        {Object.entries(interviews).map(([key, [title, url]]) => {
          return (
            <li key={key}>
              <a href={url} target="_blank" rel="noreferrer noopener">
                {title}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
