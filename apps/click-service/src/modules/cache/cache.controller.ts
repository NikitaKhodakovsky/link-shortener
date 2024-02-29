import { LinkDeletedEvent, LinkUpdatedEvent } from '@app/link-rabbitmq-contracts'
import { RabbitSubscribe } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { CacheService } from './cache.service'

@Injectable()
export class CacheRMQContoller {
	constructor(private readonly cacheService: CacheService) {}

	@RabbitSubscribe({
		contract: LinkUpdatedEvent,
		queue: 'click-service.cache.queue'
	})
	public async linkUpdatedEvent({ linkId }: LinkUpdatedEvent.Message) {
		await this.cacheService.invalidateLinkById(linkId)
	}

	@RabbitSubscribe({
		contract: LinkDeletedEvent,
		queue: 'click-service.cache.queue'
	})
	public async linkDeletedEvent({ linkIds }: LinkDeletedEvent.Message) {
		await Promise.allSettled(linkIds.map(linkId => this.cacheService.invalidateLinkById(linkId)))
	}
}
