import * as React from 'react'
import {AiOutlineTwitter} from 'react-icons/ai'

export interface Props {
  via: string
  title: string
  url: string
}

export default function TweetButton({via, title, url}: Props) {
  return (
    <div className="text-center">
      <a
        className="relative inline-block px-2 py-1 text-sm font-medium text-white rounded cursor-pointer"
        style={{
          backgroundColor: '#1b95e0',
        }}
        href={`https://twitter.com/share?url=${url}&via=${via.slice(
          1,
        )}&text=${title}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="flex items-center">
          <span className="inline-block mr-1">
            <AiOutlineTwitter color="white" />
          </span>
          <span className="inline-block whitespace-no-wrap align-top">
            Tweet
          </span>
        </span>
      </a>
    </div>
  )
}
