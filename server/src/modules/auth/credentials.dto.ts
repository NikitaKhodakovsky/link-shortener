import { IsString, Length } from 'class-validator'

export class CredentialsDTO {
	@IsString()
	@Length(4, 32)
	username: string

	@IsString()
	@Length(8, 32)
	password: string
}
