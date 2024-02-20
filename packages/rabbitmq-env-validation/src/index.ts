import { cleanEnv, host, port, str } from 'envalid'

export function validate() {
	return cleanEnv(process.env, {
		RMQ_HOST: host(),
		RMQ_PORT: port(),
		RMQ_USERNAME: str(),
		RMQ_PASSWORD: str()
	})
}
