import { useQuery } from '@tanstack/react-query'

import { FindAllLinksError, FindAllLinksResponse, findAllLinks } from '../__generated__/apiComponents'

export function useAllLinksQuery(page: number = 1, perPage: number = 20) {
	return useQuery<FindAllLinksResponse, FindAllLinksError>({
		queryKey: ['link', { page, perPage }],
		queryFn: ({ signal }) => findAllLinks({ queryParams: { page, perPage } }, signal),
		staleTime: Infinity
	})
}
