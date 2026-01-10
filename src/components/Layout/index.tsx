import * as React from 'react'

export interface Props {
	children: React.ReactNode
}

const Layout = ({children}: Props) => <div className="py-8">{children}</div>

export default Layout
