import { ClickCreateCommand } from '@app/click-rabbitmq-contracts'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

export type CreateClickDTO = Omit<ClickCreateCommand.Message, 'date'>

@Injectable()
export class ClickService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async create({ linkId, userAgent, ip }: CreateClickDTO) {
		await this.amqpConnection.publish<ClickCreateCommand.Message>(ClickCreateCommand.exchange, ClickCreateCommand.routingKey, {
			linkId,
			date: new Date(),
			userAgent,
			ip
		})
	}
}
