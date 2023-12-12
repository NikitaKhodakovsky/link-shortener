import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import { useLogoutMutation } from '../../mutations/useLogoutMutation'

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
						<button />
						<button onClick={logout} />
					</div>
				</header>
			</div>
		</div>
	)
}
