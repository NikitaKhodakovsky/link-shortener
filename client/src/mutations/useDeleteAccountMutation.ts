import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAccount } from '../__generated__/apiComponents'
import { useAuthManager } from '../auth'

export function useDeleteAccountMutation() {
	const authManager = useAuthManager()
	const client = useQueryClient()

	return useMutation({
		mutationFn: () => deleteAccount(),
		onSuccess: () => {
			authManager.setAuth(false)
			client.getQueryCache().clear()
		}
	})
}
