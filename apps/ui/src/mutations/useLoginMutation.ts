import { useJWTService, useRefreshTokenService } from '@app/react-jwt'
import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { LoginError, LoginVariables, login } from 'swagger/auth/components'
import { JWTPayloadDTO } from 'swagger/auth/schemas'

export function useLoginMutation() {
	const refreshTokenService = useRefreshTokenService()
	const authManager = useAuthManager()
	const jwtService = useJWTService()

	return useMutation<JWTPayloadDTO, LoginError, LoginVariables>({
		mutationFn: login,
		onSuccess: payload => {
			authManager.setAuth(true)
			jwtService.save(payload)
			refreshTokenService.scheduleRefresh()
		}
	})
}
