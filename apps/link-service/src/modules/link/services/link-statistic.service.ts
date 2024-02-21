import { Injectable } from '@nestjs/common'

import { LinkService } from './link.service'
import { LinkStatisticDTO } from '../dtos'

@Injectable()
export class LinkStatisticService {
	constructor(private readonly linkService: LinkService) {}

	public async statistic(userId: number, linkId: number): Promise<LinkStatisticDTO> {
		await this.linkService.findByIdOrFail(userId, linkId)

		//TODO
		return {} as any
	}
}
