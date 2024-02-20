import { cleanEnv, host, port, str } from 'envalid'

export function validate() {
	return cleanEnv(process.env, {
		DB_HOST: host(),
		DB_PORT: port(),
		DB_USERNAME: str(),
		DB_PASSWORD: str(),
		DB_DATABASE: str()
	})
}
