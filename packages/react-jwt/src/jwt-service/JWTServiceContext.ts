import { Context, createContext } from 'react'

import { JWTService } from './JWTService'

export const JWTServiceContext: Context<JWTService> = createContext(null)
