import { JWTValidationModule } from '@app/nestjs-jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { dataSourceOptions } from '../config/data-source.config'
import { LinkModule } from './link/link.module'
import { JWT_PUBLIC_KEY } from '../config/env'

@Module({
	imports: [
		JWTValidationModule.register({ publicKey: JWT_PUBLIC_KEY, global: true }),
		TypeOrmModule.forRoot(dataSourceOptions),
		LinkModule
	]
})
export class AppModule {}
