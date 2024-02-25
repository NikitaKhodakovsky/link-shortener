import { useContext } from 'react'

import { JWTServiceContext } from './JWTServiceContext'

export function useJWTService() {
	return useContext(JWTServiceContext)
}
