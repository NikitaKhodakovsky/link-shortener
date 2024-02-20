import { InjectDataSource, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { InvalidPasswordException, UsernameConflictException } from '../exceptions'
import { UserNotFoundException } from '../../user/user.exception'
import { PasswordHashingStrategy } from '../strategies'
import { createUser } from '../../user/user.factory'
import { User } from '../../user/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly passwordHashingStrategy: PasswordHashingStrategy,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectDataSource()
		private readonly dataSource: DataSource
	) {}

	public async register(username: string, password: string) {
		const candidate = await this.userRepository.findOneBy({ username })

		if (candidate) throw new UsernameConflictException()

		const { hash, salt } = await this.passwordHashingStrategy.hash(password)

		const user = createUser({ username, password: hash, salt })

		await this.userRepository.save(user)

		return user.id
	}

	public async login(username: string, password: string) {
		const user = await this.dataSource.manager.findOne(User, {
			where: { username },
			select: { id: true, password: true, salt: true }
		})

		if (!user) throw new UserNotFoundException()

		const match = await this.passwordHashingStrategy.verify(password, user.password, user.salt)

		if (!match) throw new InvalidPasswordException()

		return user.id
	}
}
