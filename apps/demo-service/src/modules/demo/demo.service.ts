import { VerifyLinkOwnershipRequest } from '@app/link-rabbitmq-contracts'
import { CreateClickCommand } from '@app/click-rabbitmq-contracts'
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'
import UserAgent from 'user-agents'

@Injectable()
export class DemoService {
	constructor(private readonly amqpConnection: AmqpConnection) {}

	public async createClicks(userId: number, linkIds: number[]) {
		const payload: VerifyLinkOwnershipRequest.Request = { userId, linkIds }

		const response = await this.amqpConnection.request<VerifyLinkOwnershipRequest.Response>({
			exchange: VerifyLinkOwnershipRequest.exchange,
			routingKey: VerifyLinkOwnershipRequest.routingKey,
			payload
		})

		const promises: Promise<unknown>[] = []

		for (const linkId of response.linkIds) {
			for (let i = 0; i < Math.round(Math.random() * 100) + 100; i++) {
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
