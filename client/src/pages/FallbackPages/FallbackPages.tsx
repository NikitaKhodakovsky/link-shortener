import { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'

import styles from './FallbackPages.module.scss'

export function NotFoundPage() {
	return (
		<div className={styles.wrapper}>
			<h1>404</h1>
			<h2>Page not found.</h2>
			<Link className="button action" to="/">
				Home page
			</Link>
		</div>
	)
}

export function FallbackPage({ resetErrorBoundary }: FallbackProps) {
	return (
		<div className={styles.wrapper}>
			<h1>OOPS!</h1>
			<h2>Something gone wrong.</h2>
			<button className="button action" onClick={resetErrorBoundary}>
				Restart
			</button>
		</div>
	)
}
