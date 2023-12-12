import { useMutation } from '@tanstack/react-query'

import { logout } from '../__generated__/apiComponents'

import { useAuthManager } from '../auth'

export function useLogoutMutation() {
	const authManager = useAuthManager()

	return useMutation({
		mutationFn: () => logout(),
		onSuccess: () => authManager.setAuth(false)
	})
}
