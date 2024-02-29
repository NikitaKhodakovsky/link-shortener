import { RabbitRPC as XRabbitRPC } from '@golevelup/nestjs-rabbitmq'
import { applyDecorators } from '@nestjs/common'

import { RabbitHandlerConfig, createHandlerConfig } from './handler-config.factory'

export function RabbitRPC({ queueOptions, ...other }: RabbitHandlerConfig) {
	const config: RabbitHandlerConfig = {
		queueOptions: { durable: false, ...queueOptions },
		...other
	}

	return applyDecorators(XRabbitRPC(createHandlerConfig(config)))
}
