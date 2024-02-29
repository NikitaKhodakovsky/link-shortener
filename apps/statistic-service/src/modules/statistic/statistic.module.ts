import { Module } from '@nestjs/common'

import { StatisticRMQController } from './statistic.controller'
import { StatisticService } from './statistic.service'

@Module({
	providers: [StatisticRMQController, StatisticService]
})
export class StatisticModule {}
