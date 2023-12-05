import configSession from 'express-session'
import RedisStore from 'connect-redis'
import Redis from 'ioredis'
import ms from 'ms'

import { SESSION_COOKIE_NAME } from './constants'

const client = new Redis({
	password: process.env.REDIS_PASSWORD,
	port: parseInt(process.env.REDIS_PORT),
	host: process.env.REDIS_HOST
})

export const session = configSession({
	secret: process.env.SESSION_SECRET,
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
