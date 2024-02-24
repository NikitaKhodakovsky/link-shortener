import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { LoginError, LoginVariables, login } from 'swagger/auth/components'
import { JWTPayloadDTO } from 'swagger/auth/schemas'

export function useLoginMutation() {
	const authManager = useAuthManager()

	return useMutation<JWTPayloadDTO, LoginError, LoginVariables>({
		mutationFn: login,
		onSuccess: () => authManager.setAuth(true)
	})
}
