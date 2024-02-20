import * as postgres from '@app/postgres-env-validation'
import { cleanEnv, port, str } from 'envalid'

export const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = postgres.validate()

export const { SERVER_PORT, JWT_PUBLIC_KEY } = cleanEnv(process.env, {
	SERVER_PORT: port(),
	JWT_PUBLIC_KEY: str()
})
