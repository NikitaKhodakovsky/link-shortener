import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './modules/app.module'
import { SERVER_PORT } from './config/env'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
			transformOptions: {
				enableImplicitConversion: true,
				exposeDefaultValues: true
			}
		})
	)

	await app.listen(SERVER_PORT)
}

bootstrap()
