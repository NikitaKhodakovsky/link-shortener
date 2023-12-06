import { NestExpressApplication } from '@nestjs/platform-express'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'

import { swaggerConfig } from './config/swagger.config'
import { session } from './config/session.config'
import { SERVER_PORT } from './config/env'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.use(session)

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

	const document = SwaggerModule.createDocument(app, swaggerConfig, {
		operationIdFactory: (_, methodKey) => methodKey
	})

	SwaggerModule.setup('swagger', app, document)

	await app.listen(SERVER_PORT)
}

bootstrap()
