import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { RedisHealthIndicator } from '@app/nestjs-ioredis-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { HealthController } from './health.controller'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

@Module({
	imports: [TerminusModule, AuthModule, UserModule],
	controllers: [HealthController],
	providers: [RabbitMQHealthIndicator, RedisHealthIndicator]
})
export class HealthModule {}
