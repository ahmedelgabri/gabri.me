import React, { PropTypes } from 'react'
import Logo from './Logo'
import data from '../../data.json'

export default ({ social = data.social }) => {
  return (
    <footer role='contentinfo'>
      <ul className='mt0 mr0 l0 mb1 p0'>
        {Object.keys(social).map(site => {
          return (
            <li key={site} className='inline-block mr1'>
              <a href={social[site]} rel='me' target='_blank'>{site}</a>
            </li>
          )
        })}
      </ul>
      <div>
        <small className='text-xs teal'> ©{new Date().getFullYear()} <Logo /></small>
      </div>
    </footer>
  )
}
