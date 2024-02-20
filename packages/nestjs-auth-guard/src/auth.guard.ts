import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ACCESS_TOKEN_COOKIE_NAME } from '@app/cookie-names'
import { JWTValidationStrategy } from '@app/nestjs-jwt'
import { Reflector } from '@nestjs/core'

import { IS_PUBLIC_KEY } from './public.decorator'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private readonly jwtValidationStrategy: JWTValidationStrategy,
		private readonly reflector: Reflector
	) {}

	public async canActivate(context: ExecutionContext) {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()])

		if (isPublic) return true

		const request = context.switchToHttp().getRequest() ?? {}
		const cookies = request.cookies ?? {}

		const payload = await this.jwtValidationStrategy.validate(cookies[ACCESS_TOKEN_COOKIE_NAME] ?? '')

		if (typeof payload !== 'object' || typeof payload.userId !== 'number') {
			throw new UnauthorizedException('User not found')
		}

		request.userId = payload.userId

		return true
	}
}
