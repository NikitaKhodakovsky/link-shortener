import { LinkDestinationRequest } from '@app/link-rabbitmq-contracts'
import { LinkNotFoundException } from '@app/link-exceptions'
import { AmqpConnection } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { CacheRecord, CacheService } from '../cache/cache.service'

@Injectable()
export class LinkService {
	constructor(
		private readonly amqpConnection: AmqpConnection,
		private readonly cacheService: CacheService
	) {}

	public async findOneByBackhalf(backhalf: string): Promise<CacheRecord> {
		const cached = await this.cacheService.findLinkByBackhalf(backhalf)

		if (cached) return cached

		const payload: LinkDestinationRequest.Request = { backhalf }

		const { link } = await this.amqpConnection.request<LinkDestinationRequest.Response>({
			exchange: LinkDestinationRequest.exchange,
			routingKey: LinkDestinationRequest.routingKey,
			payload
		})

		if (!link) throw new LinkNotFoundException()

		return this.cacheService.cacheLink(backhalf, link.id, link.destination)
	}
}
