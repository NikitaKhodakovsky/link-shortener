import * as rabbitmq from '@app/rabbitmq-env-validation'
import * as redis from '@app/redis-env-validation'
import { cleanEnv, port } from 'envalid'

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = redis.validate()

export const { SERVER_PORT } = cleanEnv(process.env, {
	SERVER_PORT: port()
})
