import { cleanEnv, port, str } from 'envalid'

import { ShowSwaggerEnum, showSwagger } from './show-swagger.util'

export { ShowSwaggerEnum }

export function validate() {
	const { GLOBAL_PREFIX, SWAGGER_NAME, ...env } = cleanEnv(process.env, {
		SERVER_PORT: port(),
		GLOBAL_PREFIX: str({ default: '' }),
		SWAGGER_NAME: str({ default: 'swagger' }),
		SHOW_SWAGGER: str({ choices: Object.values(ShowSwaggerEnum), default: ShowSwaggerEnum.DEVELOPMENT })
	})

	const SWAGGER_ROUTE = GLOBAL_PREFIX ? `${GLOBAL_PREFIX}/${SWAGGER_NAME}` : SWAGGER_NAME

	const SHOW_SWAGGER = showSwagger(env.SHOW_SWAGGER as any)

	return { GLOBAL_PREFIX, SWAGGER_ROUTE, ...env, SHOW_SWAGGER }
}
