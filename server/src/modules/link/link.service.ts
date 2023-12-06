import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { BackHalfIsNotUniqueException, LinkNotFoundException } from './link.exception'
import { BackHalfGenerationStrategy } from './backhalf-generatoin.strategy'
import { CreateLinkDTO, UpdateLinkDTO } from './link.dto'
import { UserService } from '../user/user.service'
import { createLink } from './link.factory'
import { Link } from './link.entity'

@Injectable()
export class LinkService {
	constructor(
		private readonly backHalfGenerationStrategy: BackHalfGenerationStrategy,
		@InjectRepository(Link)
		private readonly linkRepository: Repository<Link>,
		private readonly userService: UserService
	) {}

	public async create(userId: number, data: CreateLinkDTO) {
		const user = await this.userService.findById(userId)

		const backHalf = await this.backHalfGenerationStrategy.generate()

		const candidate = await this.findByBackHalf(backHalf)

		if (candidate) throw new BackHalfIsNotUniqueException()

		const link = createLink({ user, backHalf, ...data })

		await this.linkRepository.save(link)

		delete link.user

		return link
	}

	public async update(userId: number, linkId: number, data: UpdateLinkDTO) {
		const link = await this.findByIdOrFail(userId, linkId)

		this.linkRepository.merge(link, data)

		await this.linkRepository.save(link)

		return link
	}

	public async delete(userId: number, linkId: number) {
		const link = await this.findByIdOrFail(userId, linkId)

		await this.linkRepository.remove(link)

		return true
	}

	public async findByIdOrFail(userId: number, linkId: number) {
		const link = await this.linkRepository
			.createQueryBuilder('l')
			.where('l.id = :linkId', { linkId })
			.andWhere('l.userId = :userId', { userId })
			.getOne()

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
}
