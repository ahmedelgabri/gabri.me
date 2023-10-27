import * as React from 'react'
import Script from 'next/script'
import getConfig from 'next/config'

const isPROD = getConfig()?.publicRuntimeConfig?.isPROD

const GA4_TRACKING_ID = isPROD ? 'G-TDX82ST2HH' : ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
	if (isPROD) {
		window.gtag('config', GA4_TRACKING_ID, {
			page_path: url,
			anonymize_ip: true,
		})
	}
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
	action,
	category,
	label,
	value,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Record<string, any>) => {
	if (isPROD) {
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		})
	}
}

export function GA() {
	return (
		isPROD && (
			<>
				<Script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TRACKING_ID}`}
					strategy="afterInteractive"
				/>
				<Script
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
          `,
					}}
				/>
			</>
		)
	)
}
