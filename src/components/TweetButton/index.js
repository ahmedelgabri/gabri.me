// @flow
import React from 'react'
import {logEvent} from '../../utils/analytics'
import icon from '../../../public/img/twitter-btn.svg'
import {css} from 'emotion'

export default ({via, title, url}) => (
  <div css={{textAlign: 'center'}}>
    <a
      css={{
        fontSize: '11px',
        position: 'relative',
        height: '20px',
        boxSizing: 'border-box',
        padding: '1px 8px 1px 6px',
        backgroundColor: '#1b95e0',
        color: '#fff',
        borderRadius: '3px',
        fontWeight: '500',
        cursor: 'pointer',
        display: 'inline-block',
        verticalAlign: '-1px',
        border: 'none',
        '&:hover': {
          border: 'none',
        },
      }}
      onClick={() => logEvent('Tweet', title)}
      href={`https://twitter.com/share?url=${url}&via=${via.slice(
        1,
      )}&text=${title}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i
        css={{
          position: 'relative',
          top: '2px',
          display: 'inline-block',
          width: '14px',
          height: '14px',
          paddingRight: '2px',
        }}
      >
        <img src={icon} alt="" />
      </i>
      <span
        css={{
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '3px',
          whiteSpace: 'nowrap',
        }}
      >
        Tweet
      </span>
    </a>
  </div>
)
