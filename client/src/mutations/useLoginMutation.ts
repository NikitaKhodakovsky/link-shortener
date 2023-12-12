import { useMutation } from '@tanstack/react-query'

import { LoginError, LoginVariables, login } from '../__generated__/apiComponents'
import { User } from '../__generated__/apiSchemas'

export function useLoginMutation() {
	return useMutation<User, LoginError, LoginVariables>({
		mutationFn: login
	})
}
