import { Module } from '@nestjs/common'

import { ClickController } from './click.controller'
import { RabbitMQModule } from '../rabbitmq.module'
import { CacheModule } from '../cache/cache.module'
import { ClickService } from './click.service'
import { LinkService } from './link.service'

@Module({
	imports: [CacheModule, RabbitMQModule],
	controllers: [ClickController],
	providers: [ClickService, LinkService]
})
export class ClickModule {}
