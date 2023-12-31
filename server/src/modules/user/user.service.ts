import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { UserNotFoundException } from './user.exception'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	public async findById(userId: number) {
		const user = await this.userRepository.findOneBy({ id: userId })

		if (!user) throw new UserNotFoundException()

		return user
	}

	public async findByUsername(username: string) {
		return await this.userRepository.findOneBy({ username })
	}

	public async deleteById(userId: number) {
		const user = await this.findById(userId)

		await this.userRepository.remove(user)

		return true
	}
}
