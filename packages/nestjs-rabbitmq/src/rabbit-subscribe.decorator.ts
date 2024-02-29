import { RabbitSubscribe as XRabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { applyDecorators } from '@nestjs/common'

import { RabbitHandlerConfig, createHandlerConfig } from './handler-config.factory'

export function RabbitSubscribe(config: RabbitHandlerConfig) {
	return applyDecorators(XRabbitSubscribe(createHandlerConfig(config)))
}
