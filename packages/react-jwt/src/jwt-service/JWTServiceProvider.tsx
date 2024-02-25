import { ReactNode } from 'react'

import { JWTServiceContext } from './JWTServiceContext'
import { JWTService } from './JWTService'

export interface JWTServiceProviderProps {
	service: JWTService
	children: ReactNode
}

export function JWTServiceProvider({ service, children }: JWTServiceProviderProps) {
	return <JWTServiceContext.Provider value={service}>{children}</JWTServiceContext.Provider>
}
