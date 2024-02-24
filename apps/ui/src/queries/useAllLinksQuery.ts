import { useQuery } from '@tanstack/react-query'

import { FindAllLinksQueryParams, FindAllLinksResponse, FindAllLinksError, findAllLinks } from 'swagger/links/components'

export const allLinksQueryKeyBase = ['link', 'list']

export function allLinksQueryKeyFactory(params: FindAllLinksQueryParams) {
	return [...allLinksQueryKeyBase, params]
}

export function useAllLinksQuery(page: number = 1, perPage: number = 20) {
	return useQuery<FindAllLinksResponse, FindAllLinksError>({
		queryKey: allLinksQueryKeyFactory({ page, perPage }),
		queryFn: ({ signal }) => findAllLinks({ queryParams: { page, perPage } }, signal),
		staleTime: Infinity
	})
}
