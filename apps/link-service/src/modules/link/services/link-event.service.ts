import { LinkDeletedEvent, LinkUpdatedEvent } from '@app/link-rabbitmq-contracts'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LinkEventService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async linkUpdatedEvent(linkId: number) {
		await this.amqpConnection.publish<LinkUpdatedEvent.Message>(LinkUpdatedEvent.exchange, LinkUpdatedEvent.routingKey, { linkId })
	}

	public async linkDeletedEvent(linkId: number) {
		await this.amqpConnection.publish<LinkDeletedEvent.Message>(LinkDeletedEvent.exchange, LinkDeletedEvent.routingKey, { linkId })
	}
}
