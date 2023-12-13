import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UpdateLinkError, UpdateLinkVariables, updateLink } from '../__generated__/apiComponents'
import { Link } from '../__generated__/apiSchemas'

import { linkDetailsQueryKeyFactory } from '../queries/useFindLinkByIdQuery'
import { allLinksQueryKeyBase } from '../queries/useAllLinksQuery'

export function useUpdateLinkMutation() {
	const client = useQueryClient()

	return useMutation<Link, UpdateLinkError, UpdateLinkVariables>({
		mutationFn: (variables) => updateLink(variables),
		onSuccess: (data, variables) => {
			client.setQueryData(linkDetailsQueryKeyFactory(variables.pathParams.linkId), data)
			client.invalidateQueries({ queryKey: allLinksQueryKeyBase })
		}
	})
}
