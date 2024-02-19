import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { AlphanumericBackHalfGenerationStrategy, BackHalfGenerationStrategy } from './backhalf-generatoin.strategy'
import { LinkStatisticService } from './link-statistic.service'
import { LinkController } from './link.controller'
import { UserModule } from '../user/user.module'
import { LinkService } from './link.service'
import { Link } from './link.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Link]), UserModule],
	controllers: [LinkController],
	providers: [
		LinkStatisticService,
		LinkService,
		{
			provide: BackHalfGenerationStrategy,
			useClass: AlphanumericBackHalfGenerationStrategy
		}
	],
	exports: [LinkService]
})
export class LinkModule {}
