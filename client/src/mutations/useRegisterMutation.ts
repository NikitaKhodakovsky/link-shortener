import { useMutation } from '@tanstack/react-query'

import { RegisterError, RegisterVariables, register } from '../__generated__/apiComponents'
import { User } from '../__generated__/apiSchemas'
import { useAuthManager } from '../auth'

export function useRegisterMutation() {
	const authManager = useAuthManager()

	return useMutation<User, RegisterError, RegisterVariables>({
		mutationFn: register,
		onSuccess: () => authManager.setAuth(true)
	})
}
