import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'
import { Controller, Get } from '@nestjs/common'

import { LinkServiceHealthIndicator } from './link-service.health'
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
			() => this.rabbitmq.isHealthy('rabbitmq'),
			() => this.redis.isHealthy('redis'),
			() => this.linkService.isHealthy()
		])
	}
}
