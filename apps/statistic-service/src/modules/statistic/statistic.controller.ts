import { LinkStatisticRequest } from '@app/link-rabbitmq-contracts'
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { StatisticService } from './statistic.service'

@Injectable()
export class StatisticRMQController {
	constructor(private readonly statisticService: StatisticService) {}

	@RabbitRPC({
		exchange: LinkStatisticRequest.exchange,
		routingKey: LinkStatisticRequest.routingKey,
		queue: 'statistic-service.link-statistic-request.queue'
	})
	public async statistic(message: LinkStatisticRequest.Request): Promise<LinkStatisticRequest.Response> {
		return this.statisticService.statistic(message.linkId)
	}
}
