import { DynamicModule, Module, UnauthorizedException } from '@nestjs/common'
import { verify } from 'jsonwebtoken'

import { ALGORITHM } from './constants'
import { JWTPayload } from './types'

export class JWTValidationStrategy {
	constructor(private readonly publicKey: string) {}

	public validate<T extends object>(token: string): Promise<JWTPayload<T>> {
		return new Promise((res, rej) =>
			verify(token, this.publicKey, { algorithms: [ALGORITHM] }, (e, payload) => {
				if (payload && typeof payload === 'object') {
					res(payload as any)
				} else {
					if (e) {
						rej(new UnauthorizedException('Invalid or expired token'))
					} else {
						rej(new UnauthorizedException('Invalid token payload'))
					}
				}
			})
		)
	}
}

export interface JWTValidationModuleOptions {
	publicKey: string
	global?: boolean
}

@Module({
	providers: [JWTValidationStrategy],
	exports: [JWTValidationStrategy]
})
export class JWTValidationModule {
	public static register({ publicKey, global }: JWTValidationModuleOptions): DynamicModule {
		return {
			global,
			module: JWTValidationModule,
			providers: [{ provide: JWTValidationStrategy, useFactory: () => new JWTValidationStrategy(publicKey) }]
		}
	}
}
