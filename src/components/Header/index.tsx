import * as React from 'react'
import {IoMdSunny, IoMdMoon} from 'react-icons/io'
import {useTheme} from '../../hooks'
import Logo from '../Logo'
// import Back from '../Back'

export default function Header() {
  const {toggleTheme, theme} = useTheme()

  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <Logo />
        {/* [todo] fix this? */}
        {/* <Back /> */}
      </div>
      <div>
        <button onClick={toggleTheme}>
          {theme === 'dark' ? <IoMdSunny /> : <IoMdMoon />}
        </button>
      </div>
    </div>
  )
}
