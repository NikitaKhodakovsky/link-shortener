import { useMutation } from '@tanstack/react-query'

import { demo } from '../__generated__/apiComponents'
import { useAuthManager } from '../auth'

export function useDemoAccountMutation() {
	const authManager = useAuthManager()

	return useMutation({
		mutationFn: () => demo(),
		onSuccess: () => authManager.setAuth(true)
	})
}
