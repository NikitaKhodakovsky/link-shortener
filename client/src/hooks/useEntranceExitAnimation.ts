import { useEffect, useState } from 'react'

export interface UseEntranceExitAnimationArguments {
	isOpen: boolean
	entrance: string
	hidden: string
	exit: string
}

export interface UseEntranceExitAnimationResult {
	shouldRender: boolean
	animation: string
}

/* Used to prevent animation of hidden elements during page rendering */

export function useEntranceExitAnimation({ isOpen, entrance, exit, hidden }: UseEntranceExitAnimationArguments) {
	const [showAnimation, setShowAnimation] = useState(false)

	useEffect(() => {
		isOpen && setShowAnimation(true)
	}, [isOpen])

	return {
		animation: isOpen ? entrance : showAnimation ? exit : hidden,
		shouldRender: showAnimation
	}
}
