import { useNavigate } from 'react-router-dom'

type Navigate = () => void

export function useGoBack(fallback: string): Navigate {
	const navigate = useNavigate()

	return () => {
		document.referrer
	}
}
