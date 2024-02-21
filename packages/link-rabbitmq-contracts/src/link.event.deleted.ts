import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace LinkDeletedEvent {
	export const routingKey = 'link.event.deleted'
	export const exchange = LINK_EXCHANGE_NAME

	export class Message {
		linkIds: number[]
	}
}
