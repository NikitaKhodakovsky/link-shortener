import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

import { RefreshTokenGenerationStrategy } from '../strategies'

@Injectable()
export class RefreshTokenService {
	constructor(
		private readonly refreshTokenGenerationStrategy: RefreshTokenGenerationStrategy,
		private readonly expiresIn: number,
		private readonly redis: Redis
	) {}

	public async generate(accessToken: string): Promise<string> {
		const refreshToken = await this.refreshTokenGenerationStrategy.generate()

		await this.redis.set(refreshToken, accessToken, 'EX', this.expiresIn, 'NX')

		return refreshToken
	}

	public exists(token: string): Promise<boolean> {
		return this.redis.exists(token).then(Boolean)
	}

	public get(token: string): Promise<string | null> {
		return this.redis.get(token)
	}

	public async delete(token: string): Promise<void> {
		await this.redis.del(token)
	}
}
