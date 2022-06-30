import * as React from 'react'
import getConfig from 'next/config'

const isPROD = getConfig()?.publicRuntimeConfig?.isPROD

const GA4_TRACKING_ID = isPROD ? 'G-TDX82ST2HH' : ''
const GA_TRACKING_ID = isPROD ? 'UA-10517764-2' : ''

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
	if (isPROD) {
		window.gtag('config', GA4_TRACKING_ID, {
			page_path: url,
			anonymize_ip: true,
		})
		window.gtag('config', GA_TRACKING_ID, {
			page_path: url,
			anonymize_ip: true,
		})
	}
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({action, category, label, value}) => {
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
				<script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              anonymize_ip: true
            });
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
