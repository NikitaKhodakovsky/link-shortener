import { LinkDeletedEvent, LinkExchange, LinkUpdatedEvent } from '@app/link-rabbitmq-contracts'
import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { CacheService } from './cache.service'

@Injectable()
export class CacheRMQContoller {
	constructor(private readonly cacheService: CacheService) {}

	@RabbitSubscribe({
		exchange: LinkExchange.name,
		routingKey: [LinkUpdatedEvent.routingKey, LinkDeletedEvent.routingKey],
		queue: 'click-service.cache.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async handler(message: LinkUpdatedEvent.Message | LinkDeletedEvent.Message) {
		await this.cacheService.invalidateLinkById(message.linkId)
	}
}
