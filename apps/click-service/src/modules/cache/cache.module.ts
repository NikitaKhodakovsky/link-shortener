import { IORedisModule } from '@app/nestjs-ioredis'
import { Module } from '@nestjs/common'
import { Redis } from 'ioredis'

import { LINK_CACHING_DURATION, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '../../config/env'
import { CacheRMQContoller } from './cache.controller'
import { CacheService } from './cache.service'

@Module({
	imports: [IORedisModule.register({ host: REDIS_HOST, port: REDIS_PORT, password: REDIS_PASSWORD })],
	providers: [
		CacheService,
		CacheRMQContoller,
		{ provide: CacheService, useFactory: (redis: Redis) => new CacheService(LINK_CACHING_DURATION, redis), inject: [Redis] }
	],
	exports: [CacheService, IORedisModule]
})
export class CacheModule {}
