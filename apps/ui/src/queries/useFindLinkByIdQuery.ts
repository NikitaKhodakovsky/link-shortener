import { useQuery } from '@tanstack/react-query'

import { FindLinkByIdError, findLinkById } from 'swagger/links/components'
import { Link } from 'swagger/links/schemas'

export const linkDetailsQueryKeyBase = ['link', 'details']

export function linkDetailsQueryKeyFactory(linkId: number) {
	return [...linkDetailsQueryKeyBase, linkId]
}

export function useFindLinkByIdQuery(linkId: number) {
	return useQuery<Link, FindLinkByIdError>({
		queryKey: linkDetailsQueryKeyFactory(linkId),
		queryFn: ({ signal }) => findLinkById({ pathParams: { linkId } }, signal),
		staleTime: Infinity,
		retry: false
	})
}
