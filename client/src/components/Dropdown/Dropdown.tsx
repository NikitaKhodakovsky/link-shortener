import { Fragment, useEffect, useRef, useState } from 'react'

import styles from './Dropdown.module.scss'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useIsOpen } from '../../hooks/useIsOpen'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'
import { DeleteAccountConfirm } from '../DeleteAccountConfirm'

export function Dropdown() {
	const [deleteAccountConfirm, closeDeleteAccountConfirm, openDeleteAccountConfirm] = useIsOpen()
	const [isOpen, closeDropdown, _, toggleDropdown] = useIsOpen()
	const [showAnimation, setShowAnimation] = useState(false)
	const ref = useRef(null)

	useOnClickOutside(ref, closeDropdown)

	useEffect(() => {
		isOpen && setShowAnimation(true)
	}, [isOpen])

	const { mutate } = useLogoutMutation()

	const deleteAccountHandler = () => {
		openDeleteAccountConfirm()
		closeDropdown()
	}

	const logoutHandler = () => {
		mutate()
		closeDropdown()
	}

	const animation = isOpen ? styles.entrance : showAnimation ? styles.exit : styles.hidden

	return (
		<Fragment>
			<DeleteAccountConfirm isOpen={deleteAccountConfirm} closeHandler={closeDeleteAccountConfirm} />
			<div className={styles.wrap} ref={ref}>
				<button className="icon profile" onClick={toggleDropdown} />
				{showAnimation && (
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
