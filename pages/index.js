import React from 'react'
import Link from 'next/link'
import data from '../harp'
import Footer from '../components/Footer'

export default () => {
  return (
    <div>
      <h1 className='blue text-xl m0'>{data.globals.author}</h1>
      <h2 className=' blue text-m normal leading-tight m0'>Browser whisperer, symbols writer & CLI typer</h2>
      <p> I like bringing structure where it is lacking, systematizing information & automating processes. </p>
      <p> A Developer with an eye for Design, builds for performance & clarity. Mainly focusing on front-end architecture & modular design systems. </p>
      <p> Currently working at <a href='http://lightspeedhq.com'>LightspeedHQ</a> in Amsterdam, The Netherlands. </p>
      <Link href='/blog'>BLOG!</Link>
      <Footer social={data.globals.social} />
    </div>
  )
}
