import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { LinkServiceHealthIndicator } from './link-service.health'
import { HealthController } from './health.controller'
import { RabbitMQModule } from '../rabbitmq.module'
import { CacheModule } from '../cache/cache.module'

@Module({
	imports: [TerminusModule, RabbitMQModule, CacheModule],
	providers: [RabbitMQHealthIndicator, RedisHealthIndicator, LinkServiceHealthIndicator],
	controllers: [HealthController]
})
export class HealthModule {}
