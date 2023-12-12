import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateLinkError, CreateLinkVariables, createLink } from '../__generated__/apiComponents'
import { Link } from '../__generated__/apiSchemas'

export function useCreateLinkMutation() {
	const client = useQueryClient()

	return useMutation<Link, CreateLinkError, CreateLinkVariables>({
		mutationFn: (variables) => createLink(variables),
		onSuccess: () => client.invalidateQueries({ queryKey: ['link'] })
	})
}
