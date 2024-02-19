import { useMutation } from '@tanstack/react-query'

import { LoginError, LoginVariables, login } from '../__generated__/apiComponents'
import { User } from '../__generated__/apiSchemas'
import { useAuthManager } from '../auth'

export function useLoginMutation() {
	const authManager = useAuthManager()

	return useMutation<User, LoginError, LoginVariables>({
		mutationFn: login,
		onSuccess: () => authManager.setAuth(true)
	})
}
