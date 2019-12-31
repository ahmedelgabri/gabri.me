import ReactGA from 'react-ga'

export interface LogEvent {
	(category: string, action: string): void
}

export const logEvent: LogEvent = (category = '', action = '') => {
	if (process.env.NODE_ENV === 'development') {
		console.log(`Logging event for ${category} & ${action}`)
	}

	if (category && action) {
		ReactGA.event({category, action})
	}
}
