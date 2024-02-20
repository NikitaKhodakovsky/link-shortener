import { decode } from 'jsonwebtoken'

import { JWTPayload } from './types'

export class JWTDecodingStrategy {
	public async decode<T extends object>(token: string): Promise<JWTPayload<T> | null> {
		const payload = decode(token)

		if (payload && typeof payload === 'object') {
			return payload as any
		} else {
			return null
		}
	}
}
