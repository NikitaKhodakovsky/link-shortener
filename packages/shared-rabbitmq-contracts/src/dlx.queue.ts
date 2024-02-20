import { RabbitMQQueueConfig } from '@golevelup/nestjs-rabbitmq'

import { DLX_NAME } from './dlx.exchange'

export const DLX_QUEUE_NAME = 'dlx.queue'

export const DLXQueue: RabbitMQQueueConfig = {
	name: DLX_QUEUE_NAME,
	exchange: DLX_NAME,
	routingKey: 'dlx'
}
