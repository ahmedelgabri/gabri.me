// @flow
import React from 'react'
import cxs from 'cxs'
import data from '../data.json'

const s = {
  wrap: cxs({
    textAlign: 'center',
  }),
  btn: cxs({
    fontSize: 11,
    position: 'relative',
    height: '20px',
    boxSizing: 'border-box',
    padding: '1px 8px 1px 6px',
    backgroundColor: '#1b95e0',
    color: '#fff',
    borderRadius: '3px',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: -1,
    border: 'none',
    ':hover': {
      border: 'none',
    },
  }),
  label: cxs({
    display: 'inline-block',
    verticalAlign: 'top',
    marginLeft: '3px',
    whiteSpace: 'nowrap',
  }),
  icon: cxs({
    position: 'relative',
    top: '2px',
    display: 'inline-block',
    width: '14px',
    height: '14px',
    paddingRight: 2,
  }),
}

export default ({
  twitterScript = data.twitterScript,
  via = data.social.twitter.display,
  title,
  slug,
}) =>
  <div className={s.wrap}>
    <a
      className={s.btn}
      href={`https://twitter.com/share?url=${data.url}/blog/${slug}&via=${via.slice(
        1
      )}&text=${title}`}
      target="_blank"
    >
      <i className={s.icon}><img src="/static/img/twitter-btn.svg" alt="" /></i>
      <span className={s.label}>Tweet</span>
    </a>
  </div>
