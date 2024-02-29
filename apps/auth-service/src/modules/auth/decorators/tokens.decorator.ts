import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@app/cookie-names'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { TokenPair } from '../services'

export const Tokens = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	const cookies = request.cookies ?? {}

	const tokenPair: TokenPair = {
		accessToken: cookies[ACCESS_TOKEN_COOKIE_NAME] ?? '',
		refreshToken: cookies[REFRESH_TOKEN_COOKIE_NAME] ?? ''
	}

	return tokenPair
})
