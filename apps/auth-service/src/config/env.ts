import * as postgres from '@app/postgres-env-validation'
import * as redis from '@app/redis-env-validation'
import { cleanEnv, port, str } from 'envalid'

export const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = postgres.validate()

export const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = redis.validate()

export const { SERVER_PORT, JWT_PUBLIC_KEY, JWT_PRIVATE_KEY } = cleanEnv(process.env, {
	SERVER_PORT: port(),
	JWT_PUBLIC_KEY: str(),
	JWT_PRIVATE_KEY: str()
})
