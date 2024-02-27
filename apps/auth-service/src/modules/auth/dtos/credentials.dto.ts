import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH } from '@app/auth-validation-rules'
import { IsString, Length } from 'class-validator'

export class RegisterDTO {
	@IsString()
	@Length(USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH)
	username: string

	@IsString()
	@Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
	password: string
}

export class LoginDTO {
	@IsString()
	username: string

	@IsString()
	password: string
}
