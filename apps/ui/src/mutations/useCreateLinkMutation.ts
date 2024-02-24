import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CreateLinkError, CreateLinkVariables, createLink } from 'swagger/links/components'
import { Link } from 'swagger/links/schemas'

import { linkDetailsQueryKeyFactory } from '../queries/useFindLinkByIdQuery'
import { allLinksQueryKeyBase } from '../queries/useAllLinksQuery'

export function useCreateLinkMutation() {
	const client = useQueryClient()

	return useMutation<Link, CreateLinkError, CreateLinkVariables>({
		mutationFn: variables => createLink(variables),
		onSuccess: data => {
			client.setQueryData(linkDetailsQueryKeyFactory(data.id), data)
			client.invalidateQueries({ queryKey: allLinksQueryKeyBase })
		}
	})
}
