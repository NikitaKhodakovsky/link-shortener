import { CLICK_EXCHANGE_NAME } from './click.exchange'

export namespace ClickCreateCommand {
	export const routingKey = 'click.command.create'
	export const exchange = CLICK_EXCHANGE_NAME

	export class Message {
		linkId: number
		date: Date
		userAgent?: string
		ip?: string
	}
}
