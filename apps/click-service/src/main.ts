import { NestExpressApplication } from '@nestjs/platform-express'
import { SWAGGER_ROUTE } from '@app/nestjs-constants'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule } from '@nestjs/swagger'
import { NestFactory } from '@nestjs/core'

import { swaggerConfig } from './config/swagger.config'
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

	const document = SwaggerModule.createDocument(app, swaggerConfig, {
		operationIdFactory: (_, methodKey) => methodKey
	})

	SwaggerModule.setup(SWAGGER_ROUTE, app, document)

	await app.listen(SERVER_PORT)
}

bootstrap()
