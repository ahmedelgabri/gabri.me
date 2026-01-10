import Logo from '../Logo'
import {ThemeSwitcher} from './ThemeSwitcher'
import {ColorSwitcher} from './ColorSwitcher'
import {IslamicPattern} from './IslamicPatterns'

export default function Header({slug}: {slug?: string}) {
	return (
		<header className="mb-12 flex items-center justify-between gap-4">
			<div className="relative isolate min-w-0 flex-1">
				<IslamicPattern />
				<Logo slug={slug} />
			</div>
			<div className="flex items-center gap-2">
				<ColorSwitcher />
				<ThemeSwitcher />
			</div>
		</header>
	)
}
