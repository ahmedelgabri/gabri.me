import * as React from 'react'

export interface Props {
  id: string
  title?: string
}

export default function YouTube(props: Props) {
  const {id, title} = props

  return (
    <div
      className="relative h-0"
      style={{
        paddingBottom: '56.25%', // 16:9
        paddingTop: '25px',
      }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        width="560"
        height="315"
        title={title || id}
        src={`https://www.youtube.com/embed/${id}?rel=0`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  )
}
