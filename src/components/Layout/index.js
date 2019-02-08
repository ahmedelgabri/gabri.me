// @flow
import * as React from 'react'

export type Props = PropsT<{
  children: React.ReactNode,
}>

const Layout = ({children}: Props) => (
  <div css={{padding: '3% 6%'}}>{children}</div>
)

export default Layout
