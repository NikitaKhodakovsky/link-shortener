import { RabbitMQConfig as XRabbitMQConfig, RabbitMQModule as XRabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { DynamicModule, Module } from '@nestjs/common'

import { createConfig } from './config.factory'

export interface RabbitMQConfig extends XRabbitMQConfig {
	global?: boolean
}

@Module({})
export class RabbitMQModule {
	public static register({ global, ...config }: RabbitMQConfig): DynamicModule {
		return {
			module: RabbitMQModule,
			imports: [XRabbitMQModule.forRoot(XRabbitMQModule, createConfig(config))],
			exports: [XRabbitMQModule],
			global
		}
	}
}
