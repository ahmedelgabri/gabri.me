import * as React from 'react'
import Logo from '../Logo'
import {ThemeSwitcher} from './ThemeSwitcher'

export default function Header() {
	return (
		<div className="mb-12 flex items-center justify-between">
			<div>
				<Logo />
			</div>
			<div>
				<ThemeSwitcher />
			</div>
		</div>
	)
}
