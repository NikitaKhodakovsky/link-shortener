import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'

export const UserId = createParamDecorator((_: string, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()

	const userId = request.userId

	if (typeof userId !== 'number') throw new UnauthorizedException('User not found')

	return userId
})
