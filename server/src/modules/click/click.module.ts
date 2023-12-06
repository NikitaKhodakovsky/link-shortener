import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { LocationParsingStrategy, NotImplementedLocationParsingStrategy } from './location-parsing.strategy'
import { UAParsingStrategy, BowserUAParsingStrategy } from './ua-parsing.strategy'
import { ClickController } from './click.controller'
import { LinkModule } from '../link/link.module'
import { ClickService } from './click.service'
import { Click } from './click.entity'

@Module({
	imports: [LinkModule, TypeOrmModule.forFeature([Click])],
	controllers: [ClickController],
	providers: [
		ClickService,
		{ provide: LocationParsingStrategy, useClass: NotImplementedLocationParsingStrategy },
		{ provide: UAParsingStrategy, useClass: BowserUAParsingStrategy }
	]
})
export class ClickModule {}
