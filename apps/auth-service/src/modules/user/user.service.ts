import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { UserNotFoundException } from './user.exception'
import { UserEventService } from './user-event.service'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		private readonly userEventService: UserEventService,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async findOneByIdOrFail(userId: number) {
		const user = await this.userRepository.findOneBy({ id: userId })

		if (!user) throw new UserNotFoundException()

		return user
	}

	public async findByUsername(username: string) {
		return await this.userRepository.findOneBy({ username })
	}

	public async deleteById(userId: number) {
		const user = await this.findOneByIdOrFail(userId)

		await this.userRepository.remove(user)

		await this.userEventService.userDeletedEvent(userId)
	}
}
