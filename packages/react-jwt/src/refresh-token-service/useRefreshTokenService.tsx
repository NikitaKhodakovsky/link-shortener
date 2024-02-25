import { useContext } from 'react'

import { RefreshTokenServiceContext } from './RefreshTokenServiceContext'

export function useRefreshTokenService() {
	return useContext(RefreshTokenServiceContext)
}
