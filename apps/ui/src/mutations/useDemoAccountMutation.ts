import { useMutation } from '@tanstack/react-query'
import { useAuthManager } from '@app/react-auth'

//TODO

async function demo() {
	console.log('NOT IMPLEMENTED')
}

export function useDemoAccountMutation() {
	const authManager = useAuthManager()

	return useMutation({
		mutationFn: () => demo(),
		onSuccess: () => authManager.setAuth(true)
	})
}
