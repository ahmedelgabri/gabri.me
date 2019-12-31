import * as React from 'react'
import {css} from '@emotion/core'
import Highlight, {defaultProps} from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
// https://github.com/FormidableLabs/prism-react-renderer/issues/53#issuecomment-546653848
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-vim')
require('prismjs/components/prism-apacheconf')

interface Props {
	codeString: string
	language: string
}

interface InnerProps {
	className: string
	style: Record<string, unknown>
	tokens: unknown[][]
	getLineProps: (Object: {
		line: unknown[]
		key: unknown
	}) => Record<string, unknown>
	getTokenProps: (Object: {
		token: unknown
		key: unknown
	}) => Record<string, unknown>
}

export default function Code(props: Props) {
	const {codeString, language, filename} = props

	return (
		<>
			{filename && (
				<p
					css={css`
						padding-bottom: 0.5rem;
						margin: 0;
						border-bottom: 2px solid rgba(255, 255, 255, 0.2);
					`}
				>
					<code>{filename}</code>
				</p>
			)}
			<Highlight
				{...defaultProps}
				code={codeString}
				language={language}
				Prism={Prism}
				// to be able to use normal CSS Prism themes
				// https://www.npmjs.com/package/prism-react-renderer#faq
				theme={undefined}
			>
				{({
					className,
					style,
					tokens,
					getLineProps,
					getTokenProps,
				}: InnerProps) => (
					<pre className={className} style={style}>
						<code>
							{tokens.map((line, i) => (
								<div {...getLineProps({line, key: i})}>
									{/* <span
                    css={css`
                      display: inline-block;
                      width: 1.5em;
                      text-align: right;
                      margin-right: 1rem;
                      user-select: none;
                      opacity: 0.3;
                    `}
                  >
                    {i + 1}
                  </span> */}
									{line.map((token, key) => (
										<span {...getTokenProps({token, key})} />
									))}
								</div>
							))}
						</code>
					</pre>
				)}
			</Highlight>
		</>
	)
}
