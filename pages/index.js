// @flow
import React from 'react'
import cxs from 'cxs'
import data from '../data.json'
import Wrap from '../components/layout/Wrap'
import Meta from '../components/Meta'
import Logo from '../components/Logo'
import PostList from '../components/PostList'
import Talks from '../components/Talks'
import Contact from '../components/Contact'

const s = {
  logo: cxs({
    width: 50,
    display: 'inline-block',
    opacity: 0.3,
    transition: 'all .2s linear',
    ':hover': { opacity: 1 },
  }),
  split: cxs({
    '@media screen and (min-width: 48em)': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
}

export default () =>
  <Wrap>
    <Meta />
    <div>
      <Logo className={s.logo} />
      <h1>{data.author}</h1>
      <p>
        Front-end engineer,
        <br />
        Lead Front-end Developer at {' '}
        <a href="http://lightspeedhq.com">Lightspeed</a>
        <br />
        in Amsterdam, The Netherlands.
      </p>
      <Contact social={data.social} />
      <div className={s.split}>
        <div>
          <PostList />
        </div>
        <div>
          <Talks />
        </div>
      </div>
    </div>
  </Wrap>
