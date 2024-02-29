import { DynamicModule, Module } from '@nestjs/common'
import { sign } from 'jsonwebtoken'

import { ALGORITHM } from './constants'
import { JWTPayload } from './types'

/* [token, payload of token] */
export type JWTGenerationStrategyResult<T> = [string, JWTPayload<T>]

export class JWTGenerationStrategy {
	constructor(private readonly privateKey: string) {}

	public generate<T extends object>(data: T): Promise<JWTGenerationStrategyResult<T>> {
		return new Promise((res, rej) => {
			const payload: JWTPayload<T> = { ...data, exp: Math.floor(Date.now() / 1000) + 60 * 15 }

			sign(payload, this.privateKey, { algorithm: ALGORITHM }, (e, token) => (e ? rej(e) : res([token as string, payload])))
		})
	}
}

export interface JWTGenerationModuleOptions {
	privateKey: string
	global?: boolean
}

@Module({
	providers: [JWTGenerationStrategy],
	exports: [JWTGenerationStrategy]
})
export class JWTGenerationModule {
	public static register({ privateKey, global }: JWTGenerationModuleOptions): DynamicModule {
		return {
			global,
			module: JWTGenerationModule,
			providers: [{ provide: JWTGenerationStrategy, useFactory: () => new JWTGenerationStrategy(privateKey) }]
		}
	}
}
