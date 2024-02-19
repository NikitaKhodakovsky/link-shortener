import { IsString, Length } from 'class-validator'

export class RegisterDTO {
	@IsString()
	@Length(4, 32)
	username: string

	@IsString()
	@Length(8, 32)
	password: string
}

export class LoginDTO {
	@IsString()
	username: string

	@IsString()
	password: string
}
