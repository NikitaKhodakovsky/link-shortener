import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { deleteAccount } from 'swagger/auth/components'

export function useDeleteAccountMutation() {
	const authManager = useAuthManager()
	const client = useQueryClient()

	return useMutation({
		mutationFn: () => deleteAccount(),
		onSuccess: () => {
			authManager.setAuth(false)
			client.clear()
		}
	})
}
