import { createContext, CSSProperties, ReactNode, useRef } from 'react'

import { useEntranceExitAnimation } from '../../hooks/useEntranceExitAnimation'
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

const exitDuration = 200

export function Modal({ isOpen, closeHandler, title, children }: RawModalProps) {
	const ref = useRef() as any

	useOnClickOutside(ref, closeHandler)

	const { animation, render } = useEntranceExitAnimation({
		isOpen,
		entrance: styles.entrance,
		exit: styles.exit,
		exitDuration
	})

	return render ? (
		<div className={`${styles.blur} ${animation}`} style={{ '--duration': `${exitDuration}ms` } as CSSProperties}>
			<div className={`${styles.modal} ${animation}`} ref={ref}>
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
