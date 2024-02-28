import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { typeOrmModuleOptions } from '../config/data-source.config'
import { HealthModule } from './health/health.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmModuleOptions), AuthModule, UserModule, HealthModule]
})
export class AppModule {}
