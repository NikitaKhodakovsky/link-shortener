import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteLinkError, DeleteLinkVariables, deleteLink } from '../__generated__/apiComponents'

export function useDeleteLinkMutation() {
	const client = useQueryClient()

	return useMutation<boolean, DeleteLinkError, DeleteLinkVariables>({
		mutationFn: deleteLink,
		onSuccess: () => client.invalidateQueries({ queryKey: ['link'] })
	})
}
