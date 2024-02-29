import * as server from '@app/http-server-env-validation'
import * as postgres from '@app/postgres-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'
import * as redis from '@app/redis-env-validation'
import { cleanEnv, str } from 'envalid'

export const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = postgres.validate()

export const { SERVER_PORT, GLOBAL_PREFIX, SWAGGER_ROUTE, SHOW_SWAGGER } = server.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = redis.validate()

export const { JWT_PUBLIC_KEY, JWT_PRIVATE_KEY } = cleanEnv(process.env, {
	JWT_PUBLIC_KEY: str(),
	JWT_PRIVATE_KEY: str()
})
