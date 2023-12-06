import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { SessionData } from 'express-session'
import { Request, Response } from 'express'
import { ApiTags } from '@nestjs/swagger'
import {
	UnauthorizedException,
	BadRequestException,
	HttpStatus,
	Controller,
	HttpCode,
	Session,
	Delete,
	Body,
	Post,
	Req,
	Res,
	Get
} from '@nestjs/common'

import { InvalidPasswordException, UsernameConflictException } from './auth.exception'
import { UserNotFoundException } from '../user/user.exception'
import { destroySession } from './destroy-session.util'
import { UserId } from 'src/common/user-id.decorator'
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

	@Delete('logout')
	public logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		return destroySession(req, res)
	}

	@Get('profile')
	@ApiException(() => [UnauthorizedException])
	public profile(@UserId() userId: number) {
		return this.userService.findById(userId)
	}

	@Delete('profile')
	@ApiException(() => [UnauthorizedException])
	public async deleteAccount(
		@UserId() userId: number,
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		await this.userService.deleteById(userId)

		return destroySession(req, res)
	}
}
