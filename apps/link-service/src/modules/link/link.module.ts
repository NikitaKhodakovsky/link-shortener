import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AlphanumericBackHalfGenerationStrategy, BackHalfGenerationStrategy } from './strategies'
import { LinkService, LinkStatisticService } from './services'
import { LinkController } from './controllers'
import { Link } from './entities'

@Module({
	imports: [TypeOrmModule.forFeature([Link])],
	controllers: [LinkController],
	providers: [
		LinkStatisticService,
		LinkService,
		{
			provide: BackHalfGenerationStrategy,
			useClass: AlphanumericBackHalfGenerationStrategy
		}
	]
})
export class LinkModule {}
