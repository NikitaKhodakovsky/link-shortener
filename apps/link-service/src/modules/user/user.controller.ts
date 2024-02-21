import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { UserDeletedEvent } from '@app/user-rabbitmq-contracts'
import { Injectable, Logger } from '@nestjs/common'

import { LinkService } from '../link/services'

@Injectable()
export class UserRMQController {
	private readonly logger = new Logger(UserRMQController.name)

	constructor(private readonly linkService: LinkService) {}

	@RabbitSubscribe({
		exchange: UserDeletedEvent.exchange,
		routingKey: UserDeletedEvent.routingKey,
		queue: 'link-service.user-deleted-event.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public deleteAllByUserId(message: UserDeletedEvent.Message) {
		return this.linkService.deleteAllByUserId(message.userId).catch(e => {
			this.logger.error(e)
			return new Nack(true)
		})
	}
}
