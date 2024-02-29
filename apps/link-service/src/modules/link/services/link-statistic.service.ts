import { LinkStatisticRequest } from '@app/link-rabbitmq-contracts'
import { AmqpConnection } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { LinkService } from './link.service'

@Injectable()
export class LinkStatisticService {
	constructor(
		private readonly amqpConnection: AmqpConnection,
		private readonly linkService: LinkService
	) {}

	public async statistic(userId: number, linkId: number): Promise<LinkStatisticRequest.Response> {
		await this.linkService.findByIdOrFail(userId, linkId)

		const payload: LinkStatisticRequest.Request = { linkId }

		return this.amqpConnection.request<LinkStatisticRequest.Response>({
			exchange: LinkStatisticRequest.exchange,
			routingKey: LinkStatisticRequest.routingKey,
			payload
		})
	}
}
