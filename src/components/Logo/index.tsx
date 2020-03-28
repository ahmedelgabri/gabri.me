import * as React from 'react'

export interface Props {
  width?: number
  height?: number
}

export default function Logo({width = 83, height = 35}: Props) {
  return (
    <svg
      width="83"
      height="35"
      x="0"
      y="0"
      viewBox={`208.58 223.187 ${width} ${height}`}
      className="text-gray-700"
      css={{
        width: '50px',
        display: 'inline-block',
        opacity: 0.3,
        transition: 'opacity 0.2s linear',
        '&:hover': {opacity: 1},
      }}
    >
      <path
        className="fill-current"
        d="M244.804,258.189h4.722h23.618c4.002,0,8.271-0.709,10.986-2.106c2.377-1.225,4.245-2.978,5.552-5.211 c2.257-3.854,1.777-7.909,1.777-9.964v-3.691c0-1.179-1.362-2.01-2.57-2.01h-23.845l-2.479,3.926h24.84v1.557 c0,1.815,0,5.195-1.68,8.064c-2.008,3.43-6.005,5.417-11.879,5.417h-22.305v-27.046h19.68l2.478-3.936h-24.173h-23.618 c-4.002,0-7.408,0.709-10.124,2.107c-2.376,1.224-4.244,2.977-5.553,5.21c-2.255,3.853-1.659,8.128-1.659,10.183v15.366 c0,1.179,0.979,2.134,2.187,2.134h27.797l-2.823-4.019h-23.128v-16.008c0-1.816-0.128-3.168,1.552-6.037 c2.008-3.429,5.301-4.97,11.174-4.97l22.177-0.031v27.046h-4.52h-1.009L244.804,258.189z"
      />
    </svg>
  )
}
