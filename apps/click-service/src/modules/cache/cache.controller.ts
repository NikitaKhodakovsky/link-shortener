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
		routingKey: LinkUpdatedEvent.routingKey,
		queue: 'click-service.cache.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async linkUpdatedEvent({ linkId }: LinkUpdatedEvent.Message) {
		await this.cacheService.invalidateLinkById(linkId)
	}

	@RabbitSubscribe({
		exchange: LinkExchange.name,
		routingKey: LinkDeletedEvent.routingKey,
		queue: 'click-service.cache.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async linkDeletedEvent({ linkIds }: LinkDeletedEvent.Message) {
		await Promise.allSettled(linkIds.map(linkId => this.cacheService.invalidateLinkById(linkId)))
	}
}
