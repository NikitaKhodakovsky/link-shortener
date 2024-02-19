import { useEffect, useState } from 'react'

export interface UseEntranceExitAnimationArguments {
	isOpen: boolean
	entrance: string
	exit: string
	exitDuration: number
}

export interface UseEntranceExitAnimationResult {
	animation: string
	render: boolean
}

export function useEntranceExitAnimation({
	isOpen,
	entrance,
	exit,
	exitDuration
}: UseEntranceExitAnimationArguments): UseEntranceExitAnimationResult {
	const [render, setRender] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setRender(true)
		} else {
			const timeout = setTimeout(() => setRender(false), exitDuration)

			return () => clearTimeout(timeout)
		}
	}, [isOpen])

	return {
		animation: isOpen ? entrance : exit,
		render
	}
}
