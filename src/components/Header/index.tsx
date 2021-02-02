import * as React from 'react'
import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import {useTheme} from '../../hooks'
import Logo from '../Logo'

export default function Header() {
  const {toggleTheme, theme} = useTheme()

  return (
    <div className="mb-12 flex items-center justify-between">
      <div>
        <Logo />
      </div>
      <div>
        <button className="p-2" onClick={toggleTheme}>
          {theme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
        </button>
      </div>
    </div>
  )
}
