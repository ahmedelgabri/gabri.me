import * as React from 'react'
import {MDXProvider} from '@mdx-js/react'
import MdxComponents from '../mdx'

export interface Props {
	children: React.ReactNode
}

const Layout = ({children}: Props) => (
	<MDXProvider components={MdxComponents}>
		<div css={{padding: '3% 6%'}}>{children}</div>
	</MDXProvider>
)

export default Layout
