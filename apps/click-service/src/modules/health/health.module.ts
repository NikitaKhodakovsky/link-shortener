import { LinkServiceHealthIndicator } from '@app/nestjs-link-service-healthcheck'
import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { HealthController } from './health.controller'
import { CacheModule } from '../cache/cache.module'

@Module({
	imports: [TerminusModule, CacheModule],
	providers: [RabbitMQHealthIndicator, RedisHealthIndicator, LinkServiceHealthIndicator],
	controllers: [HealthController]
})
export class HealthModule {}
