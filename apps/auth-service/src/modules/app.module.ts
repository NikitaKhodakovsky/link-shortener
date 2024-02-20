import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { typeOrmModuleOptions } from '../config/data-source.config'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), AuthModule, UserModule]
})
export class AppModule {}
