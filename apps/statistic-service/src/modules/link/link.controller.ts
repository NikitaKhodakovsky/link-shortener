import { LinkDeletedEvent } from '@app/link-rabbitmq-contracts'
import { RabbitSubscribe } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { ClickService } from '../click/click.service'

@Injectable()
export class LinkRMQController {
	constructor(private readonly clickService: ClickService) {}

	@RabbitSubscribe({
		contract: LinkDeletedEvent,
		queue: 'statistic-service.link-deleted-event.queue'
	})
	public async delete(message: LinkDeletedEvent.Message) {
		await this.clickService.deleteByLinkIds(message.linkIds)
	}
}
