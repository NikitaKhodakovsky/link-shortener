import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

import { demo } from '../__generated__/apiComponents'

export function useDemoAccountMutation() {
	const authManager = useAuthManager()

	return useMutation({
		mutationFn: () => demo(),
		onSuccess: () => authManager.setAuth(true)
	})
}
