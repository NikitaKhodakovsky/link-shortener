import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from './useAuth'

export interface RequireAuthProps {
	redirectTo: string
}

export function RequireAuth({ redirectTo }: RequireAuthProps) {
	const location = useLocation()
	const { auth } = useAuth()

	if (!auth) {
		return <Navigate to={redirectTo} state={{ prevPath: location.pathname }} replace />
	}

	return <Outlet />
}
