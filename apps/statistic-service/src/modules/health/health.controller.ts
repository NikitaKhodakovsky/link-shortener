import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'
import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { Controller, Get } from '@nestjs/common'

@Controller('health')
export class HealthController {
	constructor(
		private readonly rabbitmq: RabbitMQHealthIndicator,
		private readonly health: HealthCheckService,
		private readonly db: TypeOrmHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	public async check() {
		return this.health.check([() => this.rabbitmq.isHealthy('rabbitmq'), () => this.db.pingCheck('db')])
	}
}
