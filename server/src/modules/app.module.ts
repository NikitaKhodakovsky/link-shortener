import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceConfig } from '../config/data-source.config'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { LinkModule } from './link/link.module'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceConfig), UserModule, AuthModule, LinkModule]
})
export class AppModule {}
