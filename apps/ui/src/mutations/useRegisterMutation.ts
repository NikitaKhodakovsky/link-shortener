import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { RegisterError, RegisterVariables, register } from 'swagger/auth/components'
import { JWTPayloadDTO } from 'swagger/auth/schemas'

export function useRegisterMutation() {
	const authManager = useAuthManager()

	return useMutation<JWTPayloadDTO, RegisterError, RegisterVariables>({
		mutationFn: register,
		onSuccess: () => authManager.setAuth(true)
	})
}
