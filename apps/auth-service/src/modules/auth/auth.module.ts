import { JWTDecodingStrategy, JWTGenerationModule, JWTValidationModule } from '@app/nestjs-jwt'
import { IORedisModule } from '@app/nestjs-ioredis'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { Redis } from 'ioredis'

import { Argon2PasswordHashingStrategy, PasswordHashingStrategy, RefreshTokenGenerationStrategy } from './strategies'
import { AuthService, JWTCookieService, JWTService, RefreshTokenService } from './services'
import { UserModule } from '../user/user.module'
import { AuthController } from './controllers'
import { User } from '../user/user.entity'
import {
	ACCESS_TOKEN_DURATION,
	JWT_PRIVATE_KEY,
	JWT_PUBLIC_KEY,
	REDIS_HOST,
	REDIS_PASSWORD,
	REDIS_PORT,
	REFRESH_TOKEN_DURATION
} from '../../config/env'

@Module({
	imports: [
		JWTGenerationModule.register({ privateKey: JWT_PRIVATE_KEY, expiresIn: ACCESS_TOKEN_DURATION }),
		IORedisModule.register({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD }),
		JWTValidationModule.register({ publicKey: JWT_PUBLIC_KEY, global: true }),
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
		},
		{
			provide: RefreshTokenService,
			useFactory: (strategy: RefreshTokenGenerationStrategy, redis: Redis) =>
				new RefreshTokenService(strategy, REFRESH_TOKEN_DURATION, redis),
			inject: [RefreshTokenGenerationStrategy, Redis]
		}
	],
	exports: [IORedisModule]
})
export class AuthModule {}
