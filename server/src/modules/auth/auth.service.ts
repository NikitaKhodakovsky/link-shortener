import { InjectDataSource } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

import { InvalidPasswordException, UsernameConflictException } from './auth.exception'
import { PasswordHashingStrategy } from './password-hashing.strategy'
import { UserNotFoundException } from '../user/user.exception'
import { createUser } from '../user/user.factory'
import { User } from '../user/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private readonly passwordHashingStrategy: PasswordHashingStrategy,
		@InjectDataSource()
		private readonly dataSource: DataSource
	) {}

	public async register(username: string, password: string) {
		const queryRunner = this.dataSource.createQueryRunner()

		await queryRunner.connect()

		await queryRunner.startTransaction()

		try {
			const candidate = await queryRunner.manager.findOneBy(User, { username })

			if (candidate) throw new UsernameConflictException()

			const { hash, salt } = await this.passwordHashingStrategy.hash(password)

			const user = createUser({ username, password: hash, salt })

			await queryRunner.manager.save(user)

			await queryRunner.commitTransaction()

			return user.id
		} catch (e) {
			await queryRunner.rollbackTransaction()
			throw e
		} finally {
			await queryRunner.release()
		}
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
