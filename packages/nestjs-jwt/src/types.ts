import { JwtPayload } from 'jsonwebtoken'

export type JWTPayload<T> = JwtPayload & T & { exp: number }
