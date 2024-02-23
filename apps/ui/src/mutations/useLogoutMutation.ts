import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { logout } from '../__generated__/apiComponents'

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
