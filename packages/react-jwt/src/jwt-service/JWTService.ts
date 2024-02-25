export interface BasicJWTPayload {
	exp: number
}

export const defaultKey = 'accessTokenPayload'

export class JWTService {
	private readonly key: string = defaultKey

	constructor(key?: string) {
		if (key) this.key = key
	}

	public save<T extends BasicJWTPayload>(payload: T) {
		localStorage.setItem(this.key, JSON.stringify(payload))
		return payload
	}

	public payload<T extends BasicJWTPayload>(): T | null {
		const record = localStorage.getItem(this.key)

		if (!record) return null

		try {
			const payload = JSON.parse(record)

			if (typeof payload.exp !== 'number') throw undefined

			return payload
		} catch (e) {
			localStorage.removeItem(this.key)
			return null
		}
	}

	public destroy() {
		localStorage.removeItem(this.key)
	}

	public get left(): number {
		const payload = this.payload()

		if (!payload) return 0

		const left = payload.exp - Date.now() / 1000

		return left > 0 ? left : 0
	}

	public get isValid(): boolean {
		return this.left > 0
	}
}
