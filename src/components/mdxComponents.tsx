import * as React from 'react'
import cn from 'classnames'
import YouTube from './YouTube'

type Props = Record<string, any>

export default {
  YouTube,
  p: (props: Props) => (
    <p {...props} className={cn(props.className, 'mb-4 leading-normal')} />
  ),
  a: (props: Props) => (
    <a
      {...props}
      className={cn(
        props.className,
        'border-b-2 border-myBlue-400 hover:text-black hover:bg-yellow-300 focus:text-black focus:bg-yellow-300 active:text-black active:bg-yellow-300',
      )}
    />
  ),
  ul: (props: Props) => (
    <ul
      {...props}
      className={cn(props.className, 'mb-6 list-disc list-outside')}
    />
  ),
  ol: (props: Props) => (
    <ul
      {...props}
      className={cn(props.className, 'mb-6 list-decimal list-outside')}
    />
  ),
  h1: (props: Props) => (
    <h1
      {...props}
      className={cn(
        props.className,
        'mb-6 text-5xl font-extrabold leading-none tracking-tight',
      )}
    />
  ),
  h2: (props: Props) => (
    <h2
      {...props}
      className={cn(
        props.className,
        'mb-6 text-4xl font-extrabold leading-none tracking-tight',
      )}
    />
  ),
  h3: (props: Props) => (
    <h3
      {...props}
      className={cn(
        props.className,
        'mb-6 text-3xl font-extrabold leading-none tracking-tight',
      )}
    />
  ),
  h4: (props: Props) => (
    <h4
      {...props}
      className={cn(
        props.className,
        'mb-6 text-2xl font-extrabold leading-none tracking-tight',
      )}
    />
  ),
  h5: (props: Props) => (
    <h5
      {...props}
      className={cn(
        props.className,
        'mb-6 text-xl font-extrabold leading-none tracking-tight',
      )}
    />
  ),
  h6: (props: Props) => (
    <h6
      {...props}
      className={cn(
        props.className,
        'mb-6 font-extrabold leading-none tracking-tight text-l',
      )}
    />
  ),
  blockquote: (props: Props) => (
    <blockquote
      {...props}
      className={cn(props.className, 'mb-6 w-full pl-4 ml-0 italic')}
    />
  ),
  img: (props: Props) => (
    <img {...props} className={cn(props.className, 'max-w-full')} />
  ),
  hr: (props: Props) => (
    <hr {...props} className={cn(props.className, 'mb-6')} />
  ),
}
