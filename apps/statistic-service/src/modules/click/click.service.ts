import { CreateClickCommand } from '@app/click-rabbitmq-contracts'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { In, Repository } from 'typeorm'

import { LocationParsingStrategy } from './location-parsing.strategy'
import { UAParsingStrategy } from './ua-parsing.strategy'
import { createClick } from './click.factory'
import { Click } from './click.entity'

@Injectable()
export class ClickService {
	constructor(
		private readonly locationParsingStrategy: LocationParsingStrategy,
		private readonly uaParsingStrategy: UAParsingStrategy,
		@InjectRepository(Click)
		private readonly clickRepository: Repository<Click>
	) {}

	public async create({ date, linkId, userAgent, ip }: CreateClickCommand.Message) {
		const parsedUA = await this.uaParsingStrategy.parse(userAgent)
		const location = await this.locationParsingStrategy.parse(ip)

		const click = createClick({ userAgent, linkId, date, ...parsedUA, ...location })

		return this.clickRepository.save(click)
	}

	public async deleteByLinkIds(linkIds: number[]) {
		await this.clickRepository.delete({ linkId: In(linkIds) })
	}
}
