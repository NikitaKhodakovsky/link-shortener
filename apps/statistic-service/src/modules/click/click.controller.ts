import { CreateClickCommand } from '@app/click-rabbitmq-contracts'
import { Nack, RabbitSubscribe } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { ClickService } from './click.service'

@Injectable()
export class ClickRMQController {
	constructor(private readonly clickService: ClickService) {}

	@RabbitSubscribe({
		contract: CreateClickCommand,
		queue: 'statistic-service.create-click-command.queue'
	})
	public async create(message: CreateClickCommand.Message): Promise<void | Nack> {
		try {
			await this.clickService.create(message)
		} catch {
			return new Nack(true)
		}
	}
}
