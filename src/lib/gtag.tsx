const GA4_TRACKING_ID = import.meta.env?.GA4_TRACKING_ID || process.env.GA4_TRACKING_ID

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
}: Record<string, any>) => {
	if (GA4_TRACKING_ID) {
		window.gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		})
	}
}
