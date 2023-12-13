import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'

import { Dropdown } from '../Dropdown'

export function Header() {
	const { mutate } = useLogoutMutation()

	const logout = () => mutate()

	return (
		<div className={styles.wrapper}>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						Link Shortener
					</Link>

					<div className={styles.actions}>
						{/* <button /> */}
						{/* <button onClick={logout} /> */}
						<Dropdown />
					</div>
				</header>
			</div>
		</div>
	)
}
