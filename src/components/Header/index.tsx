import * as React from 'react'
import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import {useTheme} from '../../hooks'
import Logo from '../Logo'

export default function Header() {
  const {toggleTheme, theme} = useTheme()

  return (
    <div className="flex items-center justify-between py-12">
      <div>
        <Logo />
      </div>
      <div>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
        </button>
      </div>
    </div>
  )
}
