import { VerifyLinkOwnershipRequest } from '@app/link-rabbitmq-contracts'
import { CreateClickCommand } from '@app/click-rabbitmq-contracts'
import { AmqpConnection } from '@app/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import UserAgent from 'user-agents'

import { CLICKS_PER_LINK_MAX, CLICKS_PER_LINK_MIN } from '../../config/env'

@Injectable()
export class DemoService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async createClicks(userId: number, linkIds: number[]) {
		const payload: VerifyLinkOwnershipRequest.Request = { userId, linkIds }

		const response = await this.amqpConnection.request<VerifyLinkOwnershipRequest.Response>({
			exchange: VerifyLinkOwnershipRequest.exchange,
			routingKey: VerifyLinkOwnershipRequest.routingKey,
			payload,
			timeout: 20000,
			expiration: 20000
		})

		const promises: Promise<unknown>[] = []

		for (const linkId of response.linkIds) {
			const countOfClicks = Math.min(Math.round(Math.random() * CLICKS_PER_LINK_MAX) + CLICKS_PER_LINK_MIN, CLICKS_PER_LINK_MAX)

			for (let i = 0; i < countOfClicks; i++) {
				const userAgent = new UserAgent().toString()

				const promise = this.amqpConnection.publish<CreateClickCommand.Message>(
					CreateClickCommand.exchange,
					CreateClickCommand.routingKey,
					{ linkId, date: new Date(), userAgent }
				)

				promises.push(promise)
			}
		}

		await Promise.allSettled(promises)
	}
}
