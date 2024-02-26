import { LINK_EXCHANGE_NAME } from './link.exchange'

export namespace VerifyLinkOwnershipRequest {
	export const routingKey = 'link.request.verify-ownership'
	export const exchange = LINK_EXCHANGE_NAME

	export interface Request {
		userId: number
		linkIds: number[]
	}

	export interface Response {
		userId: number
		linkIds: number[]
	}
}
