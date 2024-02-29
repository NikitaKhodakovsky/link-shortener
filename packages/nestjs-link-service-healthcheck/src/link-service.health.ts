import { LinkServicePingRequest } from '@app/link-rabbitmq-contracts'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LinkServiceHealthIndicator extends HealthIndicator {
	private readonly errorMessage = 'RabbitMQ healthcheck failed'

	constructor(private readonly amqpConnection: AmqpConnection) {
		super()
	}

	public async isHealthy(key: string) {
		try {
			const payload: LinkServicePingRequest.Request = { ping: 'healthcheck' }

			await this.amqpConnection.request<LinkServicePingRequest.Response>({
				exchange: LinkServicePingRequest.exchange,
				routingKey: LinkServicePingRequest.routingKey,
				payload
			})

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
