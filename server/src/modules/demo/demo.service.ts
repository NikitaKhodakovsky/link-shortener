import { Injectable } from '@nestjs/common'
import crypto from 'crypto'

import { ClickService } from '../click/click.service'
import { AuthService } from '../auth/auth.service'
import { LinkService } from '../link/link.service'
import { createDemoLinks } from './demo.data'
import { createClicks } from './demo.utils'

@Injectable()
export class DemoService {
	constructor(
		private readonly clickService: ClickService,
		private readonly authService: AuthService,
		private readonly linkService: LinkService
	) {}

	public async demo() {
		const username = crypto.randomBytes(20).toString('hex')
		const password = crypto.randomBytes(20).toString('hex')

		const userId = await this.authService.register(username, password)

		const promises: Promise<unknown>[] = []

		for (const item of createDemoLinks()) {
			const promise = this.linkService.create(userId, item).then((link) => createClicks(link, this.clickService))
			promises.push(promise)
		}

		await Promise.allSettled(promises)

		return userId
	}
}
