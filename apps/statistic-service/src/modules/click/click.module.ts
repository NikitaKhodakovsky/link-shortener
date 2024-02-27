import { RabbitMQModule } from '../rabbitmq.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import DeviceDetector from 'device-detector-js'
import { Module } from '@nestjs/common'

import { LocationParsingStrategy, NotImplementedLocationParsingStrategy } from './location-parsing.strategy'
import { UAParsingStrategy, BasicUAParsingStrategy } from './ua-parsing.strategy'
import { ClickInsertService } from './click-insert.service'
import { ClickRMQController } from './click.controller'
import { ClickService } from './click.service'
import { Click } from './click.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Click]), RabbitMQModule],
	providers: [
		{ provide: LocationParsingStrategy, useClass: NotImplementedLocationParsingStrategy },
		{ provide: UAParsingStrategy, useClass: BasicUAParsingStrategy },
		ClickInsertService,
		ClickRMQController,
		DeviceDetector,
		ClickService
	],
	exports: [ClickService]
})
export class ClickModule {}
