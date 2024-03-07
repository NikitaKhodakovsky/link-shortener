import { useEffect } from 'react'

export function useTitle(title?: string) {
	const initialTitle = document.title

	useEffect(() => {
		if (title) {
			document.title = title
		}

		return () => {
			document.title = initialTitle
		}
	}, [title, initialTitle])
}
