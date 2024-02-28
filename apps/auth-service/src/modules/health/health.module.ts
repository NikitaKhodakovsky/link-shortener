import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { HealthController } from './health.controller'
import { RabbitMQModule } from '../rabbitmq.module'
import { AuthModule } from '../auth/auth.module'

@Module({
	imports: [TerminusModule, RabbitMQModule, AuthModule],
	controllers: [HealthController],
	providers: [RabbitMQHealthIndicator, RedisHealthIndicator]
})
export class HealthModule {}
