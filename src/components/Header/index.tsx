import Logo from '../Logo'
import {SettingsPopover} from './SettingsPopover'

export default function Header({slug}: {slug?: string}) {
	return (
		<header className="mb-12 flex items-center justify-between gap-4">
			<div className="min-w-0 flex-1">
				<Logo slug={slug} />
			</div>
			<SettingsPopover />
		</header>
	)
}
