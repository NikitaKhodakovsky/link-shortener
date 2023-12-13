import { To, createSearchParams, useLocation } from 'react-router-dom'

export function useToHome(): To {
	const { state } = useLocation()

	const search = typeof state?.page === 'number' ? createSearchParams({ page: state?.page }).toString() : undefined

	return { pathname: '/', search }
}
