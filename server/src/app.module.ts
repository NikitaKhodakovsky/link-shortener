import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceConfig } from './config/data-source.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceConfig), UserModule, AuthModule]
})
export class AppModule {}
