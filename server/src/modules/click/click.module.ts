import { TypeOrmModule } from '@nestjs/typeorm'
import DeviceDetector from 'device-detector-js'
import { Module } from '@nestjs/common'

import { LocationParsingStrategy, NotImplementedLocationParsingStrategy } from './location-parsing.strategy'
import { UAParsingStrategy, BasicUAParsingStrategy } from './ua-parsing.strategy'
import { ClickController } from './click.controller'
import { LinkModule } from '../link/link.module'
import { ClickService } from './click.service'
import { Click } from './click.entity'

@Module({
	imports: [LinkModule, TypeOrmModule.forFeature([Click])],
	controllers: [ClickController],
	providers: [
		ClickService,
		DeviceDetector,
		{ provide: LocationParsingStrategy, useClass: NotImplementedLocationParsingStrategy },
		{ provide: UAParsingStrategy, useClass: BasicUAParsingStrategy }
	]
})
export class ClickModule {}
