// @flow
import React from 'react'
import { logEvent } from '../../utils/analytics'
import icon from '../../../public/img/twitter-btn.svg'
import { css } from 'emotion'

export default ({ via, title, url }) =>
  <div css={`text-align: center`}>
    <a
      css={`
        font-size: 11px;
        position: relative;
        height: 20px;
        box-sizing: border-box;
        padding: 1px 8px 1px 6px;
        background-color: #1b95e0;
        color: #fff;
        border-radius: 3px;
        font-weight: 500;
        cursor: pointer;
        display: inline-block;
        vertical-align: -1px;
        border: none;

        &:hover {
          border: none;
        }
      `}
      onClick={() => logEvent('Tweet', title)}
      href={`https://twitter.com/share?url=${url}&via=${via.slice(
        1
      )}&text=${title}`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i
        css={`
        position: relative;
        top: 2px;
        display: inline-block;
        width: 14px;
        height: 14px;
        padding-right: 2px;
      `}
      >
        <img src={icon} alt="" />
      </i>
      <span
        css={`
        display: inline-block;
        vertical-align: top;
        margin-left: 3px;
        white-space: nowrap;
      `}
      >
        Tweet
      </span>
    </a>
  </div>
