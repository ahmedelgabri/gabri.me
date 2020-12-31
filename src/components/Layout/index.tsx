import * as React from 'react'

export interface Props {
  children: React.ReactNode
}

const Layout = ({children}: Props) => (
  <div style={{padding: '3% 6%'}}>{children}</div>
)

export default Layout
