import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'

export const UserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request: Request = ctx.switchToHttp().getRequest()

	const userId = request.session.userId

	if (!userId) throw new UnauthorizedException()

	return userId
})
