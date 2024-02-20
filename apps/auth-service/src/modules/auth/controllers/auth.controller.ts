import { ApiException } from '@nanogiants/nestjs-swagger-api-exception-decorator'
import { AuthGuard } from '@app/nestjs-auth-guard'
import { UserId } from '@app/nestjs-utils'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'
import {
	UnauthorizedException,
	BadRequestException,
	HttpStatus,
	Controller,
	HttpCode,
	Delete,
	Body,
	Post,
	Res,
	Get,
	Param,
	UseGuards
} from '@nestjs/common'

import { JWTPayloadDTO, LoginDTO, RegisterDTO, UsernameCheckResponseDTO } from '../dtos'
import { InvalidPasswordException, UsernameConflictException } from '../exceptions'
import { AuthService, JWTCookieService, JWTService, TokenPair } from '../services'
import { UserNotFoundException } from '../../user/user.exception'
import { UserService } from '../../user/user.service'
import { Tokens } from '../decorators'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly jwtCookieService: JWTCookieService,
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly jwtService: JWTService
	) {}

	@Post('register')
	@ApiException(() => [BadRequestException, UsernameConflictException])
	public async register(@Body() { username, password }: RegisterDTO, @Res({ passthrough: true }) res: Response): Promise<JWTPayloadDTO> {
		const userId = await this.authService.register(username, password)

		const { accessToken, refreshToken, accessTokenPayload } = await this.jwtService.generate(userId)

		await this.jwtCookieService.setCookie(res, { accessToken, refreshToken })

		return accessTokenPayload
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	@ApiException(() => [BadRequestException, UserNotFoundException, InvalidPasswordException])
	public async login(@Body() { username, password }: LoginDTO, @Res({ passthrough: true }) res: Response): Promise<JWTPayloadDTO> {
		const userId = await this.authService.login(username, password)

		const { accessToken, refreshToken, accessTokenPayload } = await this.jwtService.generate(userId)

		await this.jwtCookieService.setCookie(res, { accessToken, refreshToken })

		return accessTokenPayload
	}

	@Post('refresh')
	@UseGuards(AuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiException(() => [UnauthorizedException, UserNotFoundException])
	public async refresh(
		@UserId() userId: number,
		@Tokens() tokenPair: TokenPair,
		@Res({ passthrough: true }) res: Response
	): Promise<JWTPayloadDTO> {
		await this.userService.findOneByIdOrFail(userId)

		const { accessToken, refreshToken, accessTokenPayload } = await this.jwtService.refresh(tokenPair)

		await this.jwtCookieService.setCookie(res, { accessToken, refreshToken })

		return accessTokenPayload
	}

	@Delete('logout')
	@UseGuards(AuthGuard)
	public async logout(@Tokens() tokenPair: TokenPair, @Res({ passthrough: true }) res: Response) {
		await this.jwtCookieService.clearCookie(res)
		await this.jwtService.logout(tokenPair)
	}

	@Get('profile')
	@UseGuards(AuthGuard)
	@ApiException(() => [UnauthorizedException, UserNotFoundException])
	public profile(@UserId() userId: number) {
		return this.userService.findOneByIdOrFail(userId)
	}

	@Delete('profile')
	@UseGuards(AuthGuard)
	@ApiException(() => [UnauthorizedException])
	public async deleteAccount(@UserId() userId: number, @Tokens() tokenPair: TokenPair, @Res({ passthrough: true }) res: Response) {
		await this.userService.deleteById(userId)
		await this.jwtCookieService.clearCookie(res)
		await this.jwtService.logout(tokenPair)
	}

	@Get('username/:username')
	public async checkUsername(@Param('username') username: string): Promise<UsernameCheckResponseDTO> {
		const isTaken = await this.userService.findByUsername(username).then(Boolean)

		return { isTaken }
	}
}
