import { DeadLetterExchange } from '@app/shared-rabbitmq-contracts'
import { CreateClickCommand } from '@app/click-rabbitmq-contracts'
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { ClickService } from './click.service'

@Injectable()
export class ClickRMQController {
	constructor(private readonly clickService: ClickService) {}

	@RabbitSubscribe({
		exchange: CreateClickCommand.exchange,
		routingKey: CreateClickCommand.routingKey,
		queue: 'statistic-service.create-click-command.queue',
		queueOptions: { deadLetterExchange: DeadLetterExchange.name }
	})
	public async create(message: CreateClickCommand.Message): Promise<void | Nack> {
		try {
			await this.clickService.create(message)
		} catch {
			return new Nack(true)
		}
	}
}
