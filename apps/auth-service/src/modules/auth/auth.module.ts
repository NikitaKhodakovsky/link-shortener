import { JWTDecodingStrategy, JWTGenerationModule, JWTValidationModule } from '@app/nestjs-jwt'
import { IORedisModule } from '@app/nestjs-ioredis'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { Argon2PasswordHashingStrategy, PasswordHashingStrategy, RefreshTokenGenerationStrategy } from './strategies'
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '../../config/env'
import { AuthService, JWTCookieService, JWTService, RefreshTokenService } from './services'
import { UserModule } from '../user/user.module'
import { AuthController } from './controllers'
import { User } from '../user/user.entity'

@Module({
	imports: [
		IORedisModule.register({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD }),
		JWTValidationModule.register({ publicKey: JWT_PUBLIC_KEY, global: true }),
		JWTGenerationModule.register({ privateKey: JWT_PRIVATE_KEY }),
		TypeOrmModule.forFeature([User]),
		UserModule
	],
	controllers: [AuthController],
	providers: [
		RefreshTokenGenerationStrategy,
		JWTDecodingStrategy,
		RefreshTokenService,
		JWTCookieService,
		AuthService,
		JWTService,
		{
			provide: PasswordHashingStrategy,
			useClass: Argon2PasswordHashingStrategy
		}
	],
	exports: [IORedisModule]
})
export class AuthModule {}
