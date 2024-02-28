import * as server from '@app/http-server-env-validation'
import * as postgres from '@app/postgres-env-validation'
import * as rabbitmq from '@app/rabbitmq-env-validation'

export const { SERVER_PORT } = server.validate()

export const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = postgres.validate()

export const { RMQ_HOST, RMQ_PORT, RMQ_USERNAME, RMQ_PASSWORD } = rabbitmq.validate()
