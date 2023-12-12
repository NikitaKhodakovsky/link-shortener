import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateLinkError, UpdateLinkVariables, updateLink } from '../__generated__/apiComponents'
import { Link } from '../__generated__/apiSchemas'

export function useUpdateLinkMutation() {
	const client = useQueryClient()

	return useMutation<Link, UpdateLinkError, UpdateLinkVariables>({
		mutationFn: (variables) => updateLink(variables),
		onSuccess: () => client.invalidateQueries({ queryKey: ['link'] })
	})
}
