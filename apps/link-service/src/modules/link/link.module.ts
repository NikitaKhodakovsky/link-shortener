import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AlphanumericBackHalfGenerationStrategy, BackHalfGenerationStrategy } from './strategies'
import { LinkEventService, LinkService, LinkStatisticService } from './services'
import { LinkController, LinkRMQController } from './controllers'
import { Link } from './entities'

@Module({
	imports: [TypeOrmModule.forFeature([Link])],
	controllers: [LinkController],
	providers: [
		LinkStatisticService,
		LinkRMQController,
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
