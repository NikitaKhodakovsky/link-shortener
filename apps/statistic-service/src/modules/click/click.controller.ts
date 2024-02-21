import { ClickCreateCommand } from '@app/click-rabbitmq-contracts'
import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { ClickService } from './click.service'

@Injectable()
export class ClickRMQController {
	constructor(private readonly clickService: ClickService) {}

	@RabbitSubscribe({
		exchange: ClickCreateCommand.exchange,
		routingKey: ClickCreateCommand.routingKey,
		queue: 'statistic-service.create-click-command.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async create(message: ClickCreateCommand.Message) {
		await this.clickService.create(message)
	}
}
