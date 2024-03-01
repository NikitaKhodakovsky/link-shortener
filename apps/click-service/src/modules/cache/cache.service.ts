import { Injectable, Logger } from '@nestjs/common'
import { Redis } from 'ioredis'

/*

Redis Schema:

STRING - backhalf:<backhalf> : { destination, linkId }

STRING - linkId:<linkId> : backhalf

*/

export interface CacheRecord {
	linkId: number
	destination: string
}

@Injectable()
export class CacheService {
	private readonly logger = new Logger(CacheService.name)

	constructor(
		private readonly cachingDuration: number,
		private readonly redis: Redis
	) {}

	private backhalfKey(backhalf: string) {
		return `backhalf:${backhalf}`
	}

	private linkIdKey(linkId: number) {
		return `linkId:${linkId}`
	}

	public async findLinkByBackhalf(backhalf: string): Promise<CacheRecord | null> {
		const record = await this.redis.get(this.backhalfKey(backhalf))

		try {
			return record ? JSON.parse(record) : null
		} catch (e) {
			this.logger.error(`Invalid cache record ${backhalf}, ${JSON.stringify(e)}`)
			return null
		}
	}

	public async findBackhalfById(linkId: number): Promise<string | null> {
		return this.redis.get(this.linkIdKey(linkId))
	}

	public async cacheLink(backhalf: string, linkId: number, destination: string): Promise<CacheRecord> {
		const record: CacheRecord = { linkId, destination }

		await this.redis.set(this.backhalfKey(backhalf), JSON.stringify(record), 'EX', this.cachingDuration)
		await this.redis.set(this.linkIdKey(linkId), backhalf, 'EX', this.cachingDuration)

		return record
	}

	public async invalidateLinkById(linkId: number): Promise<void> {
		const backHalf = await this.findBackhalfById(linkId)

		if (backHalf === null) return

		await this.redis.del(this.backhalfKey(backHalf))
		await this.redis.del(this.linkIdKey(linkId))
	}
}
