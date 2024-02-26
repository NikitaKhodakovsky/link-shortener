import { LinkDestinationRequest, VerifyLinkOwnershipRequest } from '@app/link-rabbitmq-contracts'
import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { LinkService } from '../services'

@Injectable()
export class LinkRMQController {
	constructor(private readonly linkService: LinkService) {}

	@RabbitRPC({
		exchange: LinkDestinationRequest.exchange,
		routingKey: LinkDestinationRequest.routingKey,
		queue: 'link-service.link-destination-request.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async linkDestinationRequest(message: LinkDestinationRequest.Request): Promise<LinkDestinationRequest.Response> {
		const link = await this.linkService.findByBackHalf(message.backhalf)

		return { link }
	}

	@RabbitRPC({
		exchange: VerifyLinkOwnershipRequest.exchange,
		routingKey: VerifyLinkOwnershipRequest.routingKey,
		queue: 'link-service.verify-link-ownership-request.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async verifyLinkOwnershipRequest(message: VerifyLinkOwnershipRequest.Request): Promise<VerifyLinkOwnershipRequest.Response> {
		const linkIds = await this.linkService.verifyOwnership(message.userId, message.linkIds)

		return { userId: message.userId, linkIds }
	}
}
