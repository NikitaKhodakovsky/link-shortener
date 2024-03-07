import { positiveInteger } from '@app/positive-integer-envalid-validator'
import * as server from '@app/http-server-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'
import { cleanEnv, str } from 'envalid'

export const { SERVER_PORT, GLOBAL_PREFIX, SWAGGER_ROUTE, SHOW_SWAGGER } = server.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { JWT_PUBLIC_KEY, CLICKS_PER_LINK_MIN, CLICKS_PER_LINK_MAX } = cleanEnv(process.env, {
	CLICKS_PER_LINK_MIN: positiveInteger(),
	CLICKS_PER_LINK_MAX: positiveInteger(),
	JWT_PUBLIC_KEY: str()
})

if (CLICKS_PER_LINK_MAX < CLICKS_PER_LINK_MIN) throw new Error('CLICKS_PER_LINK_MIN should be less or equal to CLICKS_PER_LINK_MAX')
