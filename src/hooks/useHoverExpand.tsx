import * as React from 'react'

export function useHoverExpand(collapseDelay = 300) {
	const [isExpanded, setIsExpanded] = React.useState(false)
	const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

	const handleMouseEnter = () => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		setIsExpanded(true)
	}

	const handleMouseLeave = () => {
		timeoutRef.current = setTimeout(() => {
			setIsExpanded(false)
		}, collapseDelay)
	}

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
		}
	}, [])

	return {
		isExpanded,
		hoverProps: {
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
		},
	}
}
