import { Context, createContext } from 'react'

import { RefreshTokenService } from './RefreshTokenService'

export const RefreshTokenServiceContext: Context<RefreshTokenService> = createContext(null)
