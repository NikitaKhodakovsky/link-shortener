import { Module } from '@nestjs/common'

import { LinkRMQController } from './link.controller'
import { RabbitMQModule } from '../rabbitmq.module'
import { ClickModule } from '../click/click.module'

@Module({
	imports: [RabbitMQModule, ClickModule],
	providers: [LinkRMQController]
})
export class LinkModule {}
