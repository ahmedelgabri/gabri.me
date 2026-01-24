const strokeProps = {
	stroke: 'currentColor',
	strokeWidth: 0.5,
}

function SmallShamsa({
	cx,
	cy,
	size,
	opacity = 1,
}: {
	cx: number
	cy: number
	size: number
	opacity?: number
}) {
	const half = size / 2
	const x = cx - half
	const y = cy - half

	return (
		<g opacity={opacity}>
			<rect x={x} y={y} width={size} height={size} {...strokeProps} />
			<rect
				x={x}
				y={y}
				width={size}
				height={size}
				{...strokeProps}
				transform={`rotate(30 ${cx} ${cy})`}
			/>
			<rect
				x={x}
				y={y}
				width={size}
				height={size}
				{...strokeProps}
				transform={`rotate(60 ${cx} ${cy})`}
			/>
		</g>
	)
}

function ShamsaPattern() {
	const center = 100
	const radius = 50
	const count = 12
	const smallSize = 30

	const satellites = Array.from({length: count}, (_, i) => {
		const angle = (i * 360) / count
		const rad = (angle * Math.PI) / 180
		const cx = center + radius * Math.cos(rad)
		const cy = center + radius * Math.sin(rad)
		return (
			<SmallShamsa key={i} cx={cx} cy={cy} size={smallSize} opacity={0.4} />
		)
	})

	return (
		<>
			{satellites}
			<SmallShamsa cx={center} cy={center} size={50} />
		</>
	)
}

export function IslamicPattern() {
	return (
		<svg
			aria-hidden="true"
			className="islamic-pattern pointer-events-none fixed top-10 left-15 md:top-15 -z-1"
			width="240"
			height="240"
			viewBox="0 0 200 200"
			fill="none"
			style={{color: 'var(--link-color)'}}
		>
			<ShamsaPattern />
		</svg>
	)
}
