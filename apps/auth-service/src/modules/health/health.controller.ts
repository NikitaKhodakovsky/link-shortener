import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus'
import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor(
		private readonly rabbitmq: RabbitMQHealthIndicator,
		private readonly redis: RedisHealthIndicator,
		private readonly health: HealthCheckService,
		private readonly db: TypeOrmHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	public async check() {
		return this.health.check([
			() => this.rabbitmq.isHealthy('rabbitmq'),
			() => this.redis.isHealthy('redis'),
			() => this.db.pingCheck('db')
		])
	}
}
