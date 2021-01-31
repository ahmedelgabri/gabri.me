import * as React from 'react'

export interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => (
  <div className="mx-auto xl:w-5/12 px-4 lg:px-8 py-12">{children}</div>
)

export default Layout
