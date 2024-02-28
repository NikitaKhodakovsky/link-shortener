import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { PingExchange } from './ping.exchange'

@Injectable()
export class RabbitMQHealthIndicator extends HealthIndicator {
	private readonly errorMessage = 'RabbitMQ healthcheck failed'

	constructor(private readonly amqpConnection: AmqpConnection) {
		super()
	}

	public async isHealthy(key: string) {
		try {
			await this.amqpConnection.publish(PingExchange.name, 'ping', {})

			return this.getStatus(key, true, {
				date: new Date()
			})
		} catch (e) {
			throw new HealthCheckError(
				this.errorMessage,
				this.getStatus(key, false, {
					date: new Date()
				})
			)
		}
	}
}
