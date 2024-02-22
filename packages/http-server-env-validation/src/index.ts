import { cleanEnv, port, str } from 'envalid'

export function validate() {
	const { GLOBAL_PREFIX, SWAGGER_NAME, ...env } = cleanEnv(process.env, {
		SERVER_PORT: port(),
		GLOBAL_PREFIX: str({ default: '' }),
		SWAGGER_NAME: str({ default: 'swagger' })
	})

	const SWAGGER_ROUTE = GLOBAL_PREFIX ? `${GLOBAL_PREFIX}/${SWAGGER_NAME}` : SWAGGER_NAME

	return { GLOBAL_PREFIX, SWAGGER_ROUTE, ...env }
}
