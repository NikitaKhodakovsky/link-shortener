import { User } from './user.entity'

export interface CreateUserArguments {
	username: string
	password: string
	salt: string
}

export function createUser({ username, password, salt }: CreateUserArguments) {
	const user = new User()

	user.username = username
	user.password = password
	user.salt = salt

	return user
}
