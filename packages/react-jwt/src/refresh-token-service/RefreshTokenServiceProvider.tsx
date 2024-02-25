import { ReactNode } from 'react'

import { RefreshTokenServiceContext } from './RefreshTokenServiceContext'
import { RefreshTokenService } from './RefreshTokenService'

export interface RefreshTokenServiceProviderProps {
	service: RefreshTokenService
	children: ReactNode
}

export function RefreshTokenServiceProvider({ service, children }: RefreshTokenServiceProviderProps) {
	return <RefreshTokenServiceContext.Provider value={service}>{children}</RefreshTokenServiceContext.Provider>
}
