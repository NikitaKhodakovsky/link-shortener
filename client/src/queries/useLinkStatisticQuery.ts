import { useQuery } from '@tanstack/react-query'

import { LinkStatisticError, linkStatistic } from '../__generated__/apiComponents'
import { LinkStatisticDTO } from '../__generated__/apiSchemas'

export const linkStatisticQueryKeyBase = ['link', 'statistic']

export function linkStatisticQueryKeyFactory(linkId: number) {
	return [...linkStatisticQueryKeyBase, linkId]
}

export function useLinkStatisticQuery(linkId: number) {
	return useQuery<LinkStatisticDTO, LinkStatisticError>({
		queryKey: linkStatisticQueryKeyFactory(linkId),
		queryFn: ({ signal }) => linkStatistic({ pathParams: { linkId } }, signal)
	})
}
