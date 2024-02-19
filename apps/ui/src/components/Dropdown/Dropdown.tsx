import { CSSProperties, Fragment, useRef } from 'react'

import styles from './Dropdown.module.scss'

import { useEntranceExitAnimation } from '../../hooks/useEntranceExitAnimation'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useIsOpen } from '../../hooks/useIsOpen'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'

import { DeleteAccountConfirm } from '../DeleteAccountConfirm'

const exitDuration = 200

export function Dropdown() {
	const [deleteAccountConfirm, closeDeleteAccountConfirm, openDeleteAccountConfirm] = useIsOpen()
	const [isOpen, closeDropdown, _, toggleDropdown] = useIsOpen()
	const ref = useRef(null)

	useOnClickOutside(ref, closeDropdown)

	const { mutate } = useLogoutMutation()

	const { animation, render } = useEntranceExitAnimation({
		isOpen,
		entrance: styles.entrance,
		exit: styles.exit,
		exitDuration
	})

	const deleteAccountHandler = () => {
		openDeleteAccountConfirm()
		closeDropdown()
	}

	const logoutHandler = () => {
		mutate()
		closeDropdown()
	}

	return (
		<Fragment>
			<DeleteAccountConfirm isOpen={deleteAccountConfirm} closeHandler={closeDeleteAccountConfirm} />
			<div className={styles.wrap} ref={ref}>
				<button className="icon profile" onClick={toggleDropdown} />
				{render && (
					<div
						className={`${styles.animation} ${animation}`}
						style={{ '--exit-duration': `${exitDuration}ms` } as CSSProperties}
					>
						<div className={styles.dropdown}>
							<button onClick={deleteAccountHandler}>Delete Account</button>
							<button onClick={logoutHandler}>Logout</button>
						</div>
					</div>
				)}
			</div>
		</Fragment>
	)
}
