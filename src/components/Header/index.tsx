import Logo from '../Logo'
import {ThemeSwitcher} from './ThemeSwitcher'
import {ColorSwitcher} from './ColorSwitcher'
import {FontSwitcher} from './FontSwitcher'

export default function Header({slug}: {slug?: string}) {
	return (
		<header className="mb-12 flex items-center justify-between gap-4">
			<div className="min-w-0 flex-1">
				<Logo slug={slug} />
			</div>
			<div className="flex items-center gap-2">
				<FontSwitcher />
				<ColorSwitcher />
				<ThemeSwitcher />
			</div>
		</header>
	)
}
