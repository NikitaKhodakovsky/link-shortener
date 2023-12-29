import { Fragment, useRef } from 'react'

import styles from './Dropdown.module.scss'

import { useEntranceExitAnimation } from '../../hooks/useEntranceExitAnimation'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useIsOpen } from '../../hooks/useIsOpen'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'

import { DeleteAccountConfirm } from '../DeleteAccountConfirm'

export function Dropdown() {
	const [deleteAccountConfirm, closeDeleteAccountConfirm, openDeleteAccountConfirm] = useIsOpen()
	const [isOpen, closeDropdown, _, toggleDropdown] = useIsOpen()
	const ref = useRef(null)

	useOnClickOutside(ref, closeDropdown)

	const { animation, shouldRender } = useEntranceExitAnimation({
		isOpen,
		entrance: styles.entrance,
		exit: styles.exit,
		hidden: styles.hidden
	})

	const { mutate } = useLogoutMutation()

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
				{shouldRender && (
					<div className={`${styles.animation} ${animation}`}>
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
