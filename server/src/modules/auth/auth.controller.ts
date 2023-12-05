import { Body, Controller, HttpCode, HttpStatus, Post, Session } from '@nestjs/common'
import { SessionData } from 'express-session'

import { CredentialsDTO } from './credentials.dto'
import { UserService } from '../user/user.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {}

	@Post('register')
	public async register(@Session() session: SessionData, @Body() { username, password }: CredentialsDTO) {
		const userId = await this.authService.register(username, password)

		session.userId = userId

		return this.userService.findById(userId)
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	public async login(@Session() session: SessionData, @Body() { username, password }: CredentialsDTO) {
		const userId = await this.authService.login(username, password)

		session.userId = userId

		return this.userService.findById(userId)
	}
}
