import Script from 'next/script'

const GA4_TRACKING_ID = process.env.GA4_TRACKING_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
	if (GA4_TRACKING_ID) {
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
	if (GA4_TRACKING_ID) {
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		})
	}
}

export function GA() {
	return (
		GA4_TRACKING_ID && (
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
