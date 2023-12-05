import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceConfig } from './config/data-source.config'
import { AppController } from './app.controller'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceConfig)],
	controllers: [AppController]
})
export class AppModule {}
