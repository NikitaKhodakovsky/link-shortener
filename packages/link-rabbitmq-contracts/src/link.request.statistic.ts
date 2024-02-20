import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkStatisticRequest {
	export const routingKey = 'link.request.statistic'
	export const exchange = LINK_EXCHANGE_NAME

	export class Request {
		linkId: number
	}

	export class Response {
		statistic: any
	}
}
