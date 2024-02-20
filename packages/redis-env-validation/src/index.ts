import { cleanEnv, host, port, str } from 'envalid'

export function validate() {
	return cleanEnv(process.env, {
		REDIS_HOST: host(),
		REDIS_PORT: port(),
		REDIS_PASSWORD: str()
	})
}
