import { JWTGenerationStrategy, JWTDecodingStrategy, JWTPayload } from '@app/nestjs-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'

import { RefreshTokenService } from './refresh-token.service'
import { UserService } from '../../user/user.service'

export interface TokenPair {
	accessToken: string
	refreshToken: string
}

export interface TokenPairWithAccessTokenPayload extends TokenPair {
	accessTokenPayload: JWTPayload<{ userId: number }>
}

@Injectable()
export class JWTService {
	constructor(
		private readonly jwtGenerationStrategy: JWTGenerationStrategy,
		private readonly jwtDecodingStrategy: JWTDecodingStrategy,
		private readonly refreshTokenService: RefreshTokenService,
		private readonly userService: UserService
	) {}

	public async generate(userId: number): Promise<TokenPairWithAccessTokenPayload> {
		const [accessToken, accessTokenPayload] = await this.jwtGenerationStrategy.generate({ userId })

		const refreshToken = await this.refreshTokenService.generate(accessToken)

		return {
			accessToken,
			accessTokenPayload,
			refreshToken
		}
	}

	public async refresh({ accessToken, refreshToken }: TokenPair): Promise<TokenPairWithAccessTokenPayload> {
		const storedAccessToken = await this.refreshTokenService.get(refreshToken)

		if (!storedAccessToken) {
			throw new UnauthorizedException('Refresh token had already been used, expired, or been revoked')
		}

		if (accessToken !== storedAccessToken) {
			throw new UnauthorizedException("Provided tokens don't belong to each other")
		}

		const payload = await this.jwtDecodingStrategy.decode<{ userId: number }>(accessToken)

		if (payload === null || typeof payload !== 'object' || typeof payload.userId !== 'number') {
			throw new UnauthorizedException('Invalid token payload')
		}

		await this.userService.findOneByIdOrFail(payload.userId)

		const pair = await this.generate(payload.userId)

		await this.refreshTokenService.delete(refreshToken)

		return pair
	}

	public async logout({ refreshToken }: TokenPair) {
		await this.refreshTokenService.delete(refreshToken)
	}
}
