import * as React from 'react'
import cn from 'classnames'
import YouTube from './YouTube'

type Props = Record<string, any>

export default {
  YouTube,
  p(props: Props) {
    return (
      <p {...props} className={cn(props.className, 'mb-4 leading-normal')} />
    )
  },
  ul(props: Props) {
    return (
      <ul
        {...props}
        className={cn(props.className, 'mb-6 list-disc list-outside')}
      />
    )
  },
  ol(props: Props) {
    return (
      <ul
        {...props}
        className={cn(props.className, 'mb-6 list-decimal list-outside')}
      />
    )
  },
  h3(props: Props) {
    return (
      <h3
        {...props}
        className={cn(
          props.className,
          'mb-6 text-3xl font-extrabold leading-tight tracking-tight',
        )}
      />
    )
  },
  h4(props: Props) {
    return (
      <h4
        {...props}
        className={cn(
          props.className,
          'mb-6 text-2xl font-extrabold leading-tight tracking-tight',
        )}
      />
    )
  },
  h5(props: Props) {
    return (
      <h5
        {...props}
        className={cn(
          props.className,
          'mb-6 text-xl font-extrabold leading-tight tracking-tight',
        )}
      />
    )
  },
  h6(props: Props) {
    return (
      <h6
        {...props}
        className={cn(
          props.className,
          'mb-6 font-extrabold leading-tight tracking-tight text-l',
        )}
      />
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
