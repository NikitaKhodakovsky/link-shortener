import { useQuery } from '@tanstack/react-query'

import { FindLinkByIdError, findLinkById } from '../__generated__/apiComponents'
import { Link } from '../__generated__/apiSchemas'

export function useFindLinkByIdQuery(linkId: number) {
	return useQuery<Link, FindLinkByIdError>({
		queryKey: ['link', { linkId }],
		queryFn: ({ signal }) => findLinkById({ pathParams: { linkId } }, signal),
		staleTime: Infinity
	})
}
