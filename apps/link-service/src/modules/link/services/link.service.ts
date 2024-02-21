import { LinkNotFoundException } from '@app/link-exceptions'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate } from 'nestjs-typeorm-paginate'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { BackHalfIsNotUniqueException } from '../exceptions'
import { BackHalfGenerationStrategy } from '../strategies'
import { LinkEventService } from './link-event.service'
import { CreateLinkDTO, UpdateLinkDTO } from '../dtos'
import { createLink } from '../factories'
import { Link } from '../entities'

@Injectable()
export class LinkService {
	constructor(
		private readonly backHalfGenerationStrategy: BackHalfGenerationStrategy,
		private readonly linkEventService: LinkEventService,
		@InjectRepository(Link)
		private readonly linkRepository: Repository<Link>
	) {}

	public async create(userId: number, data: CreateLinkDTO) {
		const backHalf = await this.backHalfGenerationStrategy.generate()

		const candidate = await this.findByBackHalf(backHalf)

		if (candidate) throw new BackHalfIsNotUniqueException()

		const link = createLink({ userId, backHalf, ...data })

		await this.linkRepository.save(link)

		delete link.userId

		return link
	}

	public async update(userId: number, linkId: number, data: UpdateLinkDTO) {
		const link = await this.findByIdOrFail(userId, linkId)

		this.linkRepository.merge(link, data)

		await this.linkRepository.save(link)

		await this.linkEventService.linkUpdatedEvent(link.id)

		return link
	}

	public async delete(userId: number, linkId: number) {
		const link = await this.findByIdOrFail(userId, linkId)

		await this.linkRepository.remove(link)

		await this.linkEventService.linkDeletedEvent(link.id)
	}

	public async findByIdOrFail(userId: number, linkId: number) {
		const link = await this.linkRepository.findOneBy({ id: linkId, userId })

		if (!link) throw new LinkNotFoundException()

		return link
	}

	public async findByBackHalfOrFail(backhalf: string) {
		const link = await this.linkRepository.findOneBy({ backhalf })

		if (!link) throw new LinkNotFoundException()

		return link
	}

	public async findByBackHalf(backhalf: string): Promise<Link | null> {
		return this.linkRepository.findOneBy({ backhalf })
	}

	public async findAll(userId: number, page: number = 1, perPage: number = 20) {
		const queryBuilder = this.linkRepository
			.createQueryBuilder('l')
			.where('l.userId = :userId', { userId })
			.orderBy('created_at', 'DESC')

		return paginate(queryBuilder, { page, limit: perPage })
	}
}
