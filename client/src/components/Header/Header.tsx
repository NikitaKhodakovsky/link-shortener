import { useTheme } from 'react-theme-lib'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import { Dropdown } from '../Dropdown'

export function Header() {
	const { theme, toggleTheme } = useTheme()

	return (
		<div className={styles.wrapper}>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						Link Shortener
					</Link>
					<div className={styles.actions}>
						<button
							className={`icon ${theme === 'light' ? 'moon' : 'sun'} ${styles.toggle}`}
							onClick={toggleTheme}
						></button>
						<Dropdown />
					</div>
				</header>
			</div>
		</div>
	)
}
