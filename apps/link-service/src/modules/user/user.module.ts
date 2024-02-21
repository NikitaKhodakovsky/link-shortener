import { Module } from '@nestjs/common'

import { UserRMQController } from './user.controller'
import { RabbitMQModule } from '../rabbitmq.module'
import { LinkModule } from '../link/link.module'

@Module({
	imports: [LinkModule, RabbitMQModule],
	providers: [UserRMQController]
})
export class UserModule {}
