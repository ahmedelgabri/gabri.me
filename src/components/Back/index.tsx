import * as React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

export default function Back() {
  const router = useRouter()
  const isArticle = router.pathname === '/blog/[slug]'

  return (
    isArticle && (
      <Link href="/blog">
        <a className="leading-none text-gray-500 text-sm">← Back to articles</a>
      </Link>
    )
  )
}
