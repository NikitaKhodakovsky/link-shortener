import { cleanEnv, host, port, str } from 'envalid'

export const {
	SERVER_PORT,
	SESSION_SECRET,
	REDIS_HOST,
	REDIS_PORT,
	REDIS_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_DATABASE
} = cleanEnv(process.env, {
	SERVER_PORT: port(),
	SESSION_SECRET: str(),
	REDIS_HOST: host(),
	REDIS_PORT: port(),
	REDIS_PASSWORD: str(),
	DB_HOST: host(),
	DB_PORT: port(),
	DB_USERNAME: str(),
	DB_PASSWORD: str(),
	DB_DATABASE: str()
})
