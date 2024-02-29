import * as server from '@app/http-server-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'
import { cleanEnv, str } from 'envalid'

export const { SERVER_PORT, GLOBAL_PREFIX, SWAGGER_ROUTE, SHOW_SWAGGER } = server.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()

export const { JWT_PUBLIC_KEY } = cleanEnv(process.env, { JWT_PUBLIC_KEY: str() })
