import { Module } from '@nestjs/common'

import { Argon2PasswordHashingStrategy, PasswordHashingStrategy } from './password-hashing.strategy'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'

@Module({
	imports: [UserModule],
	controllers: [AuthController],
	providers: [
		AuthService,
		{
			provide: PasswordHashingStrategy,
			useClass: Argon2PasswordHashingStrategy
		}
	]
})
export class AuthModule {}
