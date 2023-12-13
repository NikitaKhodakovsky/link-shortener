import { useRef } from 'react'

import styles from './Dropdown.module.scss'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useIsOpen } from '../../hooks/useIsOpen'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'

export function Dropdown() {
	const [isOpen, close, _, toggle] = useIsOpen()
	const ref = useRef(null)

	useOnClickOutside(ref, close)

	const { mutate } = useLogoutMutation()

	const logoutHandler = () => {
		mutate()
		close()
	}

	return (
		<div className={styles.wrap} ref={ref}>
			<button className={styles.button} onClick={toggle} />
			{isOpen && (
				<div className={styles.dropdown}>
					<button>Delete Account</button>
					<button onClick={logoutHandler}>Logout</button>
				</div>
			)}
		</div>
	)
}
