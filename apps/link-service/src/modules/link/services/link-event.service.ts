import { LinkDeletedEvent, LinkUpdatedEvent } from '@app/link-rabbitmq-contracts'
import { AmqpConnection } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LinkEventService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async linkUpdatedEvent(linkId: number) {
		await this.amqpConnection.publish<LinkUpdatedEvent.Message>(LinkUpdatedEvent.exchange, LinkUpdatedEvent.routingKey, { linkId })
	}

	public async linkDeletedEvent(linkIds: number | number[]) {
		await this.amqpConnection.publish<LinkDeletedEvent.Message>(LinkDeletedEvent.exchange, LinkDeletedEvent.routingKey, {
			linkIds: Array.isArray(linkIds) ? linkIds : [linkIds]
		})
	}
}
