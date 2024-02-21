import { UserDeletedEvent } from '@app/user-rabbitmq-contracts'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserEventService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async userDeletedEvent(userId: number) {
		await this.amqpConnection.publish<UserDeletedEvent.Message>(UserDeletedEvent.exchange, UserDeletedEvent.routingKey, { userId })
	}
}
