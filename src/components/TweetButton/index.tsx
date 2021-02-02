import * as React from 'react'
import {AiOutlineTwitter} from 'react-icons/ai'
import meta from '../../config/meta'

const {
  social: {twitter},
} = meta

export interface Props {
  via: string
  title: string
  url: string
}

export default function TweetButton({via, title, url}: Props) {
  return (
    <div className="border-t border-gray-700 mt-8 pt-8">
      You can <AiOutlineTwitter className="inline-block" color="white" />{' '}
      <a
        href={`https://twitter.com/share?url=${url}&via=${via.slice(
          1,
        )}&text=${title}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        tweet
      </a>{' '}
      this post or reach out directly to me{' '}
      <a href={twitter.url} rel="noopener noreferrer" target="_blank">
        {twitter.display}
      </a>
      .
    </div>
  )
}
