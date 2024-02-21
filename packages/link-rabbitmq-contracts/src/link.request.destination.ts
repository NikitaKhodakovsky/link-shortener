import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkDestinationRequest {
	export const routingKey = 'link.request.destination'
	export const exchange = LINK_EXCHANGE_NAME

	export interface Link {
		destination: string
		id: number
	}

	export interface Request {
		backhalf: string
	}

	export interface Response {
		link: Link | null
	}
}
