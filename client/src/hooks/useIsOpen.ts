import { useState } from 'react'

export type UseIsOpenHandler = () => void

export type OpenHandler = UseIsOpenHandler

export type CloseHandler = UseIsOpenHandler

export type ToggleHandler = UseIsOpenHandler

export function useIsOpen(initial: boolean = false): [boolean, CloseHandler, OpenHandler, ToggleHandler] {
	const [isOpen, setIsOpen] = useState(initial)

	return [isOpen, () => setIsOpen(false), () => setIsOpen(true), () => setIsOpen(!isOpen)]
}
