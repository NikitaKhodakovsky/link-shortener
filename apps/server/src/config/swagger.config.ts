import { DocumentBuilder } from '@nestjs/swagger'
import { SESSION_COOKIE_NAME } from './constants'

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Link Shortener')
	.addCookieAuth(SESSION_COOKIE_NAME)
	.setVersion('1.0.0')
	.build()
