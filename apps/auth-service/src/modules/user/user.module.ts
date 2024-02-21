import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { UserEventService } from './user-event.service'
import { RabbitMQModule } from '../rabbitmq.module'
import { UserService } from './user.service'
import { User } from './user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User]), RabbitMQModule],
	providers: [UserService, UserEventService],
	exports: [UserService, UserEventService]
})
export class UserModule {}
