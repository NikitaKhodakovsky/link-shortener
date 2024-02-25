import { AuthManager } from '@app/react-auth'

import { JWTService, BasicJWTPayload } from '../jwt-service/JWTService'

export type RefreshTokenStrategy = () => Promise<BasicJWTPayload | null> | BasicJWTPayload | null

export class RefreshTokenService {
	private refreshTimeout: number | null = null

	constructor(
		private readonly refreshTokenStrategy: RefreshTokenStrategy,
		private readonly authService: AuthManager,
		private readonly jwtService: JWTService,
		private readonly deadline: number = 60
	) {}

	public clear() {
		if (typeof this.refreshTimeout === 'number') {
			clearTimeout(this.refreshTimeout)
			this.refreshTimeout = null
		}
	}

	public async refresh() {
		const payload = await this.refreshTokenStrategy()

		if (payload) {
			this.jwtService.save(payload)
		} else {
			this.jwtService.destroy()
		}

		this.scheduleRefresh()
	}

	public scheduleRefresh() {
		this.clear()

		const payload = this.jwtService.payload()

		if (payload) {
			this.refreshTimeout = window.setTimeout(this.refresh.bind(this), payload.exp - this.deadline)
			this.authService.setAuth(true)
		} else {
			this.authService.setAuth(false)
		}
	}
}
