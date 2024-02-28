import { LinkServiceHealthIndicator } from '@app/nestjs-link-service-healthcheck'
import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Health')
@Controller('health')
export class HealthController {
	constructor(
		private readonly linkService: LinkServiceHealthIndicator,
		private readonly rabbitmq: RabbitMQHealthIndicator,
		private readonly health: HealthCheckService,
		private readonly redis: RedisHealthIndicator
	) {}

	@Get()
	@HealthCheck()
	public async check() {
		return this.health.check([
			() => this.linkService.isHealthy('link-service'),
			() => this.rabbitmq.isHealthy('rabbitmq'),
			() => this.redis.isHealthy('redis')
		])
	}
}
