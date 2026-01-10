'use client'

const strokeProps = {
	stroke: 'currentColor',
	strokeWidth: 0.75,
}

function ShamsaPattern() {
	return (
		<>
			<rect x="21" y="21" width="58" height="58" {...strokeProps} />
			<rect
				x="21"
				y="21"
				width="58"
				height="58"
				{...strokeProps}
				transform="rotate(30 50 50)"
			/>
			<rect
				x="21"
				y="21"
				width="58"
				height="58"
				{...strokeProps}
				transform="rotate(60 50 50)"
			/>
		</>
	)
}

export function IslamicPattern() {
	return (
		<svg
			aria-hidden="true"
			className="islamic-pattern absolute left-10 top-3 -z-1"
			width="120"
			height="120"
			viewBox="0 0 100 100"
			fill="none"
			style={{color: 'var(--link-color)'}}
		>
			<ShamsaPattern />
		</svg>
	)
}
