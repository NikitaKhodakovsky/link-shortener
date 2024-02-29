import { RabbitMQContract, RabbitHandlerConfig, RabbitHandlerSchemaConfig } from './handler-config.factory'
import { RabbitMQModule, RabbitMQConfig } from './rabbitmq.module'
import { RabbitSubscribe } from './rabbit-subscribe.decorator'
import { RabbitRPC } from './rabbit-rpc.decorator'

export * from '@golevelup/nestjs-rabbitmq'

export { RabbitHandlerConfig, RabbitMQModule, RabbitMQConfig, RabbitMQContract, RabbitHandlerSchemaConfig, RabbitSubscribe, RabbitRPC }
