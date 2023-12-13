import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteLinkError, DeleteLinkVariables, deleteLink } from '../__generated__/apiComponents'

import { linkDetailsQueryKeyFactory } from '../queries/useFindLinkByIdQuery'
import { allLinksQueryKeyBase } from '../queries/useAllLinksQuery'

export function useDeleteLinkMutation() {
	const client = useQueryClient()

	return useMutation<boolean, DeleteLinkError, DeleteLinkVariables>({
		mutationFn: deleteLink,
		onSuccess: (_, variables) => {
			client.invalidateQueries({ queryKey: linkDetailsQueryKeyFactory(variables.pathParams.linkId) })
			client.invalidateQueries({ queryKey: allLinksQueryKeyBase })
		}
	})
}
