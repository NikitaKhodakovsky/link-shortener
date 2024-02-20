import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@app/cookie-names'
import { Injectable } from '@nestjs/common'
import { Response } from 'express'

import { TokenPair } from './jwt.service'

@Injectable()
export class JWTCookieService {
	public setCookie(response: Response, { accessToken, refreshToken }: TokenPair): Promise<void> | void {
		response.cookie(ACCESS_TOKEN_COOKIE_NAME, accessToken, { httpOnly: true, secure: true, sameSite: 'lax' })
		response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, { httpOnly: true, secure: true, sameSite: 'lax' })
	}

	public clearCookie(response: Response): Promise<void> | void {
		response.clearCookie(ACCESS_TOKEN_COOKIE_NAME)
		response.clearCookie(REFRESH_TOKEN_COOKIE_NAME)
	}
}
