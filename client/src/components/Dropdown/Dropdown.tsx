import { Fragment, useRef } from 'react'

import styles from './Dropdown.module.scss'

import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useIsOpen } from '../../hooks/useIsOpen'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'
import { DeleteAccountConfirm } from '../DeleteAccountConfirm'

export function Dropdown() {
	const [deleteAccountConfirm, closeDeleteAccountConfirm, openDeleteAccountConfirm] = useIsOpen()
	const [dropdown, closeDropdown, _, toggleDropdown] = useIsOpen()
	const ref = useRef(null)

	useOnClickOutside(ref, closeDropdown)

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
				{dropdown && (
					<div className={styles.dropdownAnimation}>
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
