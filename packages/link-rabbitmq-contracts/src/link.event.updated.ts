import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkUpdatedEvent {
	export const routingKey = 'link.event.updateted'
	export const exchange = LINK_EXCHANGE_NAME

	export class Message {
		linkId: number
	}
}
