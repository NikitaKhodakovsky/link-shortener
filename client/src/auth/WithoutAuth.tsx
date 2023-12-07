import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '../auth'

export interface WithoutAuthProps {
	redirectTo: string
}

export function WithoutAuth({ redirectTo }: WithoutAuthProps) {
	const location = useLocation()
	const { auth } = useAuth()

	if (auth) {
		return <Navigate to={redirectTo} state={{ prevPath: location.pathname }} replace />
	}

	return <Outlet />
}
