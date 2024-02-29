import { Injectable } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RefreshTokenService {
	constructor(private readonly redis: Redis) {}

	public async set(token: string, accessToken: string, expiresIn?: number): Promise<void> {
		//@ts-ignore
		await this.redis.set(token, accessToken, 'NX', 'EX', expiresIn)
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
