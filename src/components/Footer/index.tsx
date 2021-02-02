import * as React from 'react'
import meta from '../../config/meta'

const {author} = meta

export default function Footer() {
  return (
    <p className="text-gray-300 dark:text-gray-500 text-sm py-12">
      © {new Date().getFullYear()} {author}
    </p>
  )
}
