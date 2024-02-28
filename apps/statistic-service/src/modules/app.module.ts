import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceOptions } from '../config/data-source.config'
import { StatisticModule } from './statistic/statistic.module'
import { HealthModule } from './health/health.module'
import { ClickModule } from './click/click.module'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceOptions), ClickModule, StatisticModule, HealthModule]
})
export class AppModule {}
