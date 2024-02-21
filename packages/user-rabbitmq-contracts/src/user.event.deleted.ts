import { USER_EXCHANGE_NAME } from './user.exchange'

export namespace UserDeletedEvent {
	export const routingKey = 'user.event.deleted'
	export const exchange = USER_EXCHANGE_NAME

	export class Message {
		userId: number
	}
}
