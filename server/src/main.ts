import { NestExpressApplication } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'

import { session } from './config/session.config'
import { SERVER_PORT } from './config/env'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	app.use(session)

	await app.listen(SERVER_PORT)
}

bootstrap()
