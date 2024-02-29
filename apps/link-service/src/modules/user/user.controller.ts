import { UserDeletedEvent } from '@app/user-rabbitmq-contracts'
import { Nack, RabbitSubscribe } from '@app/nestjs-rabbitmq'
import { Injectable, Logger } from '@nestjs/common'

import { LinkService } from '../link/services'

@Injectable()
export class UserRMQController {
	private readonly logger = new Logger(UserRMQController.name)

	constructor(private readonly linkService: LinkService) {}

	@RabbitSubscribe({
		contract: UserDeletedEvent,
		queue: 'link-service.user-deleted-event.queue'
	})
	public deleteAllByUserId(message: UserDeletedEvent.Message) {
		return this.linkService.deleteAllByUserId(message.userId).catch(e => {
			this.logger.error(e)
			return new Nack(true)
		})
	}
}
