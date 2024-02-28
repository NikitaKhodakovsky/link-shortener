import { LinkDestinationRequest } from '@app/link-rabbitmq-contracts'
import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

@Injectable()
export class LinkServiceHealthIndicator extends HealthIndicator {
	private readonly errorMessage = 'RabbitMQ healthcheck failed'
	private readonly key = 'link-service'

	constructor(private readonly amqpConnection: AmqpConnection) {
		super()
	}

	public async isHealthy() {
		try {
			const payload: LinkDestinationRequest.Request = { backhalf: 'healthcheck' }

			await this.amqpConnection.request<LinkDestinationRequest.Response>({
				exchange: LinkDestinationRequest.exchange,
				routingKey: LinkDestinationRequest.routingKey,
				payload
			})

			return this.getStatus(this.key, true, {
				date: new Date()
			})
		} catch (e) {
			throw new HealthCheckError(
				this.errorMessage,
				this.getStatus(this.key, false, {
					date: new Date()
				})
			)
		}
	}
}
