import React, { PropTypes } from 'react'
import Link from 'react-router/Link'
import Helmet from 'react-helmet'

import data from '../../data.json'
import Footer from './Footer'

const styles = {
  red: {
    color: 'red'
  }
}

export default props => {
  return (
    <div className={styles.red}>
      <h1>
        {props.params.post}!
        LOL
      </h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Footer social={data.social} />
    </div>
  )
}

