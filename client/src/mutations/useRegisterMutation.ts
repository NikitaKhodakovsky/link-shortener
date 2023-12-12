import { useMutation } from '@tanstack/react-query'

import { RegisterError, RegisterVariables, register } from '../__generated__/apiComponents'
import { User } from '../__generated__/apiSchemas'

export function useRegisterMutation() {
	return useMutation<User, RegisterError, RegisterVariables>({
		mutationFn: register
	})
}
