import { ConflictException, UnauthorizedException } from '@nestjs/common'

export class UsernameConflictException extends ConflictException {
	constructor() {
		super('User with such username already exists')
	}
}

export class InvalidPasswordException extends UnauthorizedException {
	constructor() {
		super('Invalid password')
	}
}
