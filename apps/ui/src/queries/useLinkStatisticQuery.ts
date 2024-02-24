import { useQuery } from '@tanstack/react-query'

import { LinkStatisticError, linkStatistic } from 'swagger/links/components'
import { LinkStatisticDTO } from 'swagger/links/schemas'

export const linkStatisticQueryKeyBase = ['link', 'statistic']

export function linkStatisticQueryKeyFactory(linkId: number) {
	return [...linkStatisticQueryKeyBase, linkId]
}

export function useLinkStatisticQuery(linkId: number) {
	return useQuery<LinkStatisticDTO, LinkStatisticError>({
		queryKey: linkStatisticQueryKeyFactory(linkId),
		queryFn: ({ signal }) => linkStatistic({ pathParams: { linkId } }, signal),
		refetchInterval: 1000 * 60 * 1,
		retry: false
	})
}
