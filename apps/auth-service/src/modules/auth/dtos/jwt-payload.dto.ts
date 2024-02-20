import { JWTPayload } from '@app/nestjs-jwt'

export class JWTPayloadDTO implements JWTPayload<{ userId: number }> {
	userId: number
	exp: number
	iat?: number
}
