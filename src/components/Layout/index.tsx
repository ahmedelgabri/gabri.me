import * as React from 'react'

export interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => (
  <div className="mx-auto py-12 lg:w-my">{children}</div>
)

export default Layout
