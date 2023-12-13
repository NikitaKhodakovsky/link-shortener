import { useState } from 'react'

export type OpenHandler = () => void

export type CloseHandler = () => void

export type ToggleHandler = () => void

export function useIsOpen(initial: boolean = false): [boolean, CloseHandler, OpenHandler, ToggleHandler] {
	const [isOpen, setIsOpen] = useState(initial)

	return [isOpen, () => setIsOpen(false), () => setIsOpen(true), () => setIsOpen(!isOpen)]
}
