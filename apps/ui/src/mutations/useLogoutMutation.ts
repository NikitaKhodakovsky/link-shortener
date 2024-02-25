import { useJWTService, useRefreshTokenService } from '@app/react-jwt'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { logout } from 'swagger/auth/components'

export function useLogoutMutation() {
	const refreshTokenService = useRefreshTokenService()
	const authManager = useAuthManager()
	const jwtService = useJWTService()
	const client = useQueryClient()

	return useMutation({
		mutationFn: () => logout(),
		onSuccess: () => {
			refreshTokenService.clear()
			authManager.setAuth(false)
			jwtService.destroy()
			client.clear()
		}
	})
}
