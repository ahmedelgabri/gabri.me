import * as React from 'react'

export default function Footer() {
  return (
    <p className="text-gray-300 dark:text-gray-800 text-sm">
      © {new Date().getFullYear()}
    </p>
  )
}
