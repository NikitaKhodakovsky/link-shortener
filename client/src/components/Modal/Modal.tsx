import { createContext, ReactNode, useEffect, useRef, useState } from 'react'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'

import styles from './Modal.module.scss'

export type CloseHandler = () => void

export interface ModalProps {
	closeHandler: CloseHandler
	isOpen: boolean
	title?: string
}

export type ModalRenderFunction = (props: ModalProps) => ReactNode

export interface RawModalProps extends ModalProps {
	children: ReactNode
}

const defaultContext: ModalProps = {
	isOpen: false,
	closeHandler: () => console.error('ModalContext can not be used outside ModalContext.Provider')
}

export const ModalContext = createContext<ModalProps>(defaultContext)

export function Modal({ isOpen, closeHandler, title, children }: RawModalProps) {
	const [showAnimation, setShowAnimation] = useState(false)
	const ref = useRef() as any

	useOnClickOutside(ref, closeHandler)

	useEffect(() => {
		isOpen && setShowAnimation(true)
	}, [isOpen])

	const animation = isOpen ? styles.entrance : showAnimation ? styles.exit : styles.hidden

	return showAnimation ? (
		<div className={`${styles.blur} ${animation}`}>
			<div className={`${styles.modal} ${animation}`} ref={isOpen ? ref : null}>
				<ModalContext.Provider value={{ isOpen, closeHandler }}>
					<div className={styles.header}>
						<button onClick={closeHandler} className={`icon close ${styles.close}`} />
						{title && <h1>{title}</h1>}
					</div>
					{children}
				</ModalContext.Provider>
			</div>
		</div>
	) : null
}
