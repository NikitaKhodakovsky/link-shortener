import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceConfig } from './config/data-source.config'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { LinkModule } from './modules/link/link.module'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceConfig), UserModule, AuthModule, LinkModule]
})
export class AppModule {}
