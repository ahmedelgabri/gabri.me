import * as React from 'react'
import {preToCodeBlock} from 'mdx-utils'
import YouTube from '../YouTube'
import Code from './Code'

export default {
  YouTube,
  pre: (preProps: Record<string, any>) => {
    const props = preToCodeBlock(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />
    } else {
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />
    }
  },
}
