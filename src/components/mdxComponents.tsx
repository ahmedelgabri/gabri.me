import * as React from 'react'
import cn from 'classnames'
import YouTube from './YouTube'
import H from './Prose/H'

type Props = Record<string, any> & {children: React.ReactNode}

export default {
  YouTube,
  p(props: Props) {
    return <p {...props} className={cn(props.className, 'mb-4')} />
  },
  ul(props: Props) {
    return (
      <ul
        {...props}
        className={cn(
          props.className,
          'mb-6 list-disc pl-4 md:pl-0 md:list-outside',
        )}
      />
    )
  },
  ol(props: Props) {
    return (
      <ul
        {...props}
        className={cn(
          props.className,
          'mb-6 list-decimal pl-4 md:pl-0 md:list-outside',
        )}
      />
    )
  },
  h3(props: Props) {
    return <H level="3" {...props} className={cn(props.className, 'mb-6')} />
  },
  h4(props: Props) {
    return <H level="4" {...props} className={cn(props.className, 'mb-6')} />
  },
  h5(props: Props) {
    return <H level="5" {...props} className={cn(props.className, 'mb-6')} />
  },
  h6(props: Props) {
    return (
      <H level="6" {...props} className={cn(props.className, 'mb-6 text-l')} />
    )
  },
  blockquote(props: Props) {
    return (
      <blockquote
        {...props}
        className={cn(props.className, 'mb-6 w-full pl-4 ml-0 italic')}
      />
    )
  },
  img(props: Props) {
    return <img {...props} className={cn(props.className, 'max-w-full')} />
  },
  hr(props: Props) {
    return <hr {...props} className={cn(props.className, 'mb-6')} />
  },
}
