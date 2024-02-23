import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { RegisterError, RegisterVariables, register } from '../__generated__/apiComponents'
import { User } from '../__generated__/apiSchemas'

export function useRegisterMutation() {
	const authManager = useAuthManager()

	return useMutation<User, RegisterError, RegisterVariables>({
		mutationFn: register,
		onSuccess: () => authManager.setAuth(true)
	})
}
