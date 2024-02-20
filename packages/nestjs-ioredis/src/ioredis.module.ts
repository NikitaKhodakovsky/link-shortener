import { DynamicModule, Logger, Module, OnApplicationShutdown } from '@nestjs/common'
import { Redis, RedisOptions } from 'ioredis'
import { ModuleRef } from '@nestjs/core'

export interface IORedisModuleOptions extends RedisOptions {
	global?: boolean
}

@Module({})
export class IORedisModule implements OnApplicationShutdown {
	private readonly logger = new Logger(IORedisModule.name)

	constructor(private readonly moduleRef: ModuleRef) {}

	public static async register({ global, ...options }: IORedisModuleOptions = {}): Promise<DynamicModule> {
		const redis = new Redis(options)

		return {
			module: IORedisModule,
			providers: [{ provide: Redis, useFactory: () => redis }],
			exports: [Redis],
			global
		}
	}

	public onApplicationShutdown() {
		const redis = this.moduleRef.get(Redis)

		return redis.quit().catch(this.logger.error)
	}
}
