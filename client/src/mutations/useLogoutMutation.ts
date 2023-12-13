import { useMutation, useQueryClient } from '@tanstack/react-query'

import { logout } from '../__generated__/apiComponents'

import { useAuthManager } from '../auth'

export function useLogoutMutation() {
	const authManager = useAuthManager()
	const client = useQueryClient()

	return useMutation({
		mutationFn: () => logout(),
		onSuccess: () => {
			authManager.setAuth(false)
			client.clear()
		}
	})
}
