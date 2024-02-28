import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkServicePingRequest {
	export const routingKey = 'link.request.ping'
	export const exchange = LINK_EXCHANGE_NAME

	export interface Request {
		ping: string
	}

	export interface Response {
		pong: string
	}
}
