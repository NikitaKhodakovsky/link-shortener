import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { LinkDeletedEvent } from '@app/link-rabbitmq-contracts'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { ClickService } from '../click/click.service'

@Injectable()
export class LinkRMQController {
	constructor(private readonly clickService: ClickService) {}

	@RabbitSubscribe({
		exchange: LinkDeletedEvent.exchange,
		routingKey: LinkDeletedEvent.routingKey,
		queue: 'statistic-service.link-deleted-event.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async delete(message: LinkDeletedEvent.Message) {
		await this.clickService.deleteByLinkIds(message.linkIds)
	}
}
