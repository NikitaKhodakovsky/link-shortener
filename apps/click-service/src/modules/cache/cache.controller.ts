import { LinkDeletedEvent, LinkUpdatedEvent } from '@app/link-rabbitmq-contracts'
import { QueueOptions, RabbitSubscribe } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { LINK_CACHING_DURATION } from '../../config/env'
import { CacheService } from './cache.service'

const queueOptions: QueueOptions = { durable: false, messageTtl: LINK_CACHING_DURATION }

@Injectable()
export class CacheRMQContoller {
	constructor(private readonly cacheService: CacheService) {}

	@RabbitSubscribe({
		contract: LinkUpdatedEvent,
		queue: 'click-service.cache.queue',
		queueOptions
	})
	public async linkUpdatedEvent({ linkId }: LinkUpdatedEvent.Message) {
		await this.cacheService.invalidateLinkById(linkId)
	}

	@RabbitSubscribe({
		contract: LinkDeletedEvent,
		queue: 'click-service.cache.queue',
		queueOptions
	})
	public async linkDeletedEvent({ linkIds }: LinkDeletedEvent.Message) {
		await Promise.allSettled(linkIds.map(linkId => this.cacheService.invalidateLinkById(linkId)))
	}
}
