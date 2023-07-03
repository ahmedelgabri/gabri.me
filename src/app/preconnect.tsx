'use client'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

export function Preconnect() {
	// @ts-ignore
	ReactDOM.preconnect('https://fonts.googleapis.com')
	// @ts-ignore
	ReactDOM.preconnect('https://fonts.gstatic.com', {crossOrigin: 'anonymous'})

	return null
}
