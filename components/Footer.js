import React from 'react'

export default ({ social = {} }) => {
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
      {/* <div className="">
      <small className="text-xs dark-navy"> ©{new Date().getFullYear()} Ahmed El Gabri </small>
    </div> */}
    </footer>
  )
}
