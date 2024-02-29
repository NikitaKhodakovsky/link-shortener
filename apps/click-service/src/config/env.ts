import * as server from '@app/http-server-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'
import * as redis from '@app/redis-env-validation'

export const { SERVER_PORT, GLOBAL_PREFIX, SWAGGER_ROUTE, SHOW_SWAGGER } = server.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = redis.validate()
