import { LinkServiceHealthIndicator } from '@app/nestjs-link-service-healthcheck'
import { RabbitMQHealthIndicator } from '@app/nestjs-rabbitmq-healthcheck'
import { TerminusModule } from '@nestjs/terminus'
import { Module } from '@nestjs/common'

import { HealthController } from './health.controller'
import { DemoModule } from '../demo/demo.module'

@Module({
	imports: [TerminusModule, DemoModule],
	controllers: [HealthController],
	providers: [RabbitMQHealthIndicator, LinkServiceHealthIndicator]
})
export class HealthModule {}
