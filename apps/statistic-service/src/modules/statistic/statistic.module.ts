import { Module } from '@nestjs/common'

import { StatisticRMQController } from './statistic.controller'
import { StatisticService } from './statistic.service'
import { RabbitMQModule } from '../rabbitmq.module'

@Module({
	imports: [RabbitMQModule],
	providers: [StatisticRMQController, StatisticService]
})
export class StatisticModule {}
