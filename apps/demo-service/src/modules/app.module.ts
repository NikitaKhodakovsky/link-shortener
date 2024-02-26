import { JWTValidationModule } from '@app/nestjs-jwt'
import { Module } from '@nestjs/common'

import { DemoModule } from './demo/demo.module'
import { JWT_PUBLIC_KEY } from '../config/env'

@Module({
	imports: [DemoModule, JWTValidationModule.register({ publicKey: JWT_PUBLIC_KEY, global: true })]
})
export class AppModule {}
