export function useCycleOption<T>(
	options: readonly T[],
	currentValue: T,
	setValue: (value: T) => void,
) {
	const cycle = () => {
		const currentIndex = options.indexOf(currentValue)
		const nextIndex = (currentIndex + 1) % options.length
		setValue(options[nextIndex])
	}

	const getVisibility = (option: T, isExpanded: boolean) => {
		const isSelected = option === currentValue
		const showWhenCollapsed = isSelected && !isExpanded
		const showWhenExpanded = isExpanded
		return {
			isSelected,
			isVisible: showWhenCollapsed || showWhenExpanded,
		}
	}

	return {cycle, getVisibility}
}
