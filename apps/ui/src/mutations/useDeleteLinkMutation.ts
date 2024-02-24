import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DeleteLinkError, DeleteLinkVariables, deleteLink } from 'swagger/links/components'

import { linkStatisticQueryKeyFactory } from '../queries/useLinkStatisticQuery'
import { linkDetailsQueryKeyFactory } from '../queries/useFindLinkByIdQuery'
import { allLinksQueryKeyBase } from '../queries/useAllLinksQuery'

export function useDeleteLinkMutation() {
	const client = useQueryClient()

	return useMutation<void, DeleteLinkError, DeleteLinkVariables>({
		mutationFn: deleteLink,
		onSuccess: (_, variables) => {
			client.invalidateQueries({ queryKey: linkStatisticQueryKeyFactory(variables.pathParams.linkId) })
			client.invalidateQueries({ queryKey: linkDetailsQueryKeyFactory(variables.pathParams.linkId) })
			client.invalidateQueries({ queryKey: allLinksQueryKeyBase })
		}
	})
}
