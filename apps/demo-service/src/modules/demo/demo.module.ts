import { Module } from '@nestjs/common'

import { RabbitMQModule } from '../rabbitmq.module'
import { DemoController } from './demo.controller'
import { DemoService } from './demo.service'

@Module({
	imports: [RabbitMQModule],
	controllers: [DemoController],
	providers: [DemoService]
})
export class DemoModule {}
