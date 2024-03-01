import * as server from '@app/http-server-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'
import { seconds } from '@app/seconds-envalid-validator'
import * as redis from '@app/redis-env-validation'
import { cleanEnv } from 'envalid'

export const { SERVER_PORT, GLOBAL_PREFIX, SWAGGER_ROUTE, SHOW_SWAGGER } = server.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = redis.validate()

export const { LINK_CACHING_DURATION } = cleanEnv(process.env, {
	LINK_CACHING_DURATION: seconds({ default: 15 * 60 })
})
