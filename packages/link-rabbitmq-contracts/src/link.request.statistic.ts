import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkStatisticRequest {
	export const routingKey = 'link.request.statistic'
	export const exchange = LINK_EXCHANGE_NAME

	export interface LinkStatistic {
		platforms: Record<string, number>
		browsers: Record<string, number>
		devices: Record<string, number>
		systems: Record<string, number>
		clicks: number
	}

	export interface Request {
		linkId: number
	}

	export type Response = LinkStatistic
}
