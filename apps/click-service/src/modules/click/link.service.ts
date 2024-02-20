import { LinkNotFoundException } from '@app/link-exceptions'
import { Injectable } from '@nestjs/common'

import { CacheRecord, CacheService } from '../cache/cache.service'

const links: Record<string, CacheRecord> = {
	'backhalf-1': { linkId: 1, destination: 'https://google.com' },
	'backhalf-2': { linkId: 2, destination: 'https://youtube.com' },
	'backhalf-3': { linkId: 3, destination: 'https://deepl.com' }
}

//TODO
function request(backhalf: string) {
	return links[backhalf] ?? null
}

@Injectable()
export class LinkService {
	constructor(private readonly cacheService: CacheService) {}

	public async findOneByBackhalf(backhalf: string): Promise<CacheRecord> {
		const cached = await this.cacheService.findLinkByBackhalf(backhalf)

		if (cached) return cached

		const link = request(backhalf)

		if (!link) throw new LinkNotFoundException()

		await this.cacheService.cacheLink(backhalf, link.linkId, link.destination)

		return link
	}
}
