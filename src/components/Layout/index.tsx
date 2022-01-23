import * as React from 'react'

export interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => (
  <div className="lg:w-my mx-auto py-12">{children}</div>
)

export default Layout
