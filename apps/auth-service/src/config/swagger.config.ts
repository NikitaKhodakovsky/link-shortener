import { ACCESS_TOKEN_COOKIE_NAME } from '@app/cookie-names'
import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerConfig = new DocumentBuilder() //
	.setTitle('Auth Service')
	.addCookieAuth(ACCESS_TOKEN_COOKIE_NAME)
	.build()
