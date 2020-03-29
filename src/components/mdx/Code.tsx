import * as React from 'react'
import cn from 'classnames'
import Highlight, {defaultProps} from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'
// https://github.com/FormidableLabs/prism-react-renderer/issues/53#issuecomment-546653848
// @ts-ignore
;(typeof global !== 'undefined' ? global : window).Prism = Prism

require('prismjs/components/prism-vim')
require('prismjs/components/prism-apacheconf')

interface Props {
  codeString: string
  language: string
  className?: string
  filename?: string
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
  const {codeString, language, filename, className: customClassName} = props

  return (
    <>
      {filename && (
        <span className={cn('block p-2 m-0 bg-gray-800 text-white')}>
          <code>File: {filename}</code>
        </span>
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
          <pre className={cn(className, customClassName)} style={style}>
            <code>
              {tokens.map((line, i) => (
                <div {...getLineProps({line, key: i})}>
                  <span className="inline-block w-8 mr-4 text-right opacity-25 select-none">
                    {i + 1}
                  </span>
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
