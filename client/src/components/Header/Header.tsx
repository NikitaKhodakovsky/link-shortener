import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import { Dropdown } from '../Dropdown'

export function Header() {
	return (
		<div className={styles.wrapper}>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						Link Shortener
					</Link>
					<Dropdown />
				</header>
			</div>
		</div>
	)
}
