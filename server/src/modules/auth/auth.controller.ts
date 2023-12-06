import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, Session } from '@nestjs/common'
import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { SessionData } from 'express-session'
import { ApiTags } from '@nestjs/swagger'

import { InvalidPasswordException, UsernameConflictException } from './auth.exception'
import { UserNotFoundException } from '../user/user.exception'
import { CredentialsDTO } from './credentials.dto'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Post('register')
	@ApiException(() => [BadRequestException, UsernameConflictException])
	public async register(@Session() session: SessionData, @Body() { username, password }: CredentialsDTO) {
		const userId = await this.authService.register(username, password)

		session.userId = userId

		return this.userService.findById(userId)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiException(() => [BadRequestException, UserNotFoundException, InvalidPasswordException])
	public async login(@Session() session: SessionData, @Body() { username, password }: CredentialsDTO) {
		const userId = await this.authService.login(username, password)

		session.userId = userId

		return this.userService.findById(userId)
	}
}
