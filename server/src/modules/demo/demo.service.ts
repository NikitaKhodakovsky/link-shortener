import { Injectable } from '@nestjs/common'
import crypto from 'crypto'

import { ClickService } from '../click/click.service'
import { AuthService } from '../auth/auth.service'
import { LinkService } from '../link/link.service'
import { CreateLinkDTO } from '../link/link.dto'
import { createClicks } from './demo.utils'

const links: CreateLinkDTO[] = [
	{ name: 'GitHub', destination: 'https://github.com' },
	{ name: 'YouTube', destination: 'https://youtube.com' },
	{ name: 'LinkedIn', destination: 'https://linkedin.com' },
	{ name: 'Udemy', destination: 'https://udemy.com' },
	{ name: 'DeepL', destination: 'https://www.deepl.com' },
	{ name: 'Facebook', destination: 'https://www.facebook.com' }
].reverse()

@Injectable()
export class DemoService {
	constructor(
		private readonly clickService: ClickService,
		private readonly authService: AuthService,
		private readonly linkService: LinkService
	) {}

	public async demo() {
		const username = crypto.randomBytes(10).toString()
		const password = crypto.randomBytes(10).toString()

		const userId = await this.authService.register(username, password)

		const promises: Promise<unknown>[] = []

		for (const item of links) {
			const promise = this.linkService.create(userId, item).then((link) => createClicks(link, this.clickService))
			promises.push(promise)
		}

		await Promise.allSettled(promises)

		return userId
	}
}
