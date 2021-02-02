import * as React from 'react'

export interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => (
  <div className="xl:w-my px-4 lg:p-12">{children}</div>
)

export default Layout
