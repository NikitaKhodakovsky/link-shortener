import { HealthCheckError, HealthIndicator } from '@nestjs/terminus'
import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisHealthIndicator extends HealthIndicator {
	private readonly errorMessage = 'Redis healthcheck failed'

	constructor(private readonly redis: Redis) {
		super()
	}

	public isHealthy(key: string, timeout: number = 5000) {
		return new Promise<void>((res, rej) => {
			const timer = setTimeout(() => rej(`${this.errorMessage}; Timeout;`), timeout)

			this.redis.ping('ping', e => {
				clearTimeout(timer)
				e ? rej(this.errorMessage) : res()
			})
		})
			.then(() => this.getStatus(key, true, { date: new Date() }))
			.catch(message => {
				throw new HealthCheckError(message, this.getStatus(key, false, { date: new Date() }))
			})
	}
}
