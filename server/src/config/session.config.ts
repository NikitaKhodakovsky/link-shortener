import configSession from 'express-session'
import RedisStore from 'connect-redis'
import Redis from 'ioredis'
import ms from 'ms'

import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, SESSION_SECRET } from './env'
import { SESSION_COOKIE_NAME } from './constants'

const client = new Redis({
	password: REDIS_PASSWORD,
	port: REDIS_PORT,
	host: REDIS_HOST
})

export const session = configSession({
	secret: SESSION_SECRET,
	store: new RedisStore({ client }),
	name: SESSION_COOKIE_NAME,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		maxAge: ms('1y'),
		sameSite: true
	}
})
