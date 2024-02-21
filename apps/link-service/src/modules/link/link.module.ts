import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AlphanumericBackHalfGenerationStrategy, BackHalfGenerationStrategy } from './strategies'
import { LinkEventService, LinkService, LinkStatisticService } from './services'
import { RabbitMQModule } from '../rabbitmq.module'
import { LinkController } from './controllers'
import { Link } from './entities'

@Module({
	imports: [TypeOrmModule.forFeature([Link]), RabbitMQModule],
	controllers: [LinkController],
	providers: [
		LinkStatisticService,
		LinkEventService,
		LinkService,
		{
			provide: BackHalfGenerationStrategy,
			useClass: AlphanumericBackHalfGenerationStrategy
		}
	],
	exports: [LinkService]
})
export class LinkModule {}
