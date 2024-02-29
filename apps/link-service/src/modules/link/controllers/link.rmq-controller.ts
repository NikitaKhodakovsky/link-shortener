import { LinkDestinationRequest, VerifyLinkOwnershipRequest } from '@app/link-rabbitmq-contracts'
import { RabbitRPC } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { LinkService } from '../services'

@Injectable()
export class LinkRMQController {
	constructor(private readonly linkService: LinkService) {}

	@RabbitRPC({
		contract: LinkDestinationRequest,
		queue: 'link-service.link-destination-request.queue'
	})
	public async linkDestinationRequest(message: LinkDestinationRequest.Request): Promise<LinkDestinationRequest.Response> {
		const link = await this.linkService.findByBackHalf(message.backhalf)

		return { link }
	}

	@RabbitRPC({
		contract: VerifyLinkOwnershipRequest,
		queue: 'link-service.verify-link-ownership-request.queue'
	})
	public async verifyLinkOwnershipRequest(message: VerifyLinkOwnershipRequest.Request): Promise<VerifyLinkOwnershipRequest.Response> {
		const linkIds = await this.linkService.verifyOwnership(message.userId, message.linkIds)

		return { userId: message.userId, linkIds }
	}
}
