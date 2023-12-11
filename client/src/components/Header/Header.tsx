import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

export function Header() {
	return (
		<div className={styles.wrapper}>
			<div className="container">
				<header className={styles.header}>
					<Link to="/" className={styles.logo}>
						Link Shortener
					</Link>

					<div className={styles.actions}>
						<button />
						<button />
					</div>
				</header>
			</div>
		</div>
	)
}
