import { FallbackProps } from 'react-error-boundary'
import { Link } from 'react-router-dom'

import { useTitle } from 'hooks/useTitle'

import styles from './FallbackPages.module.scss'

export function NotFoundPage() {
	useTitle('Not Found | Link Shortener')

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
	useTitle('Something gone wrong... | Link Shortener')

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
