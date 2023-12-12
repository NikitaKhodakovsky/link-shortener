import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger'
import { Type, applyDecorators } from '@nestjs/common'

export function ApiOkPaginatedResponse<T extends Type<unknown>>(data: T) {
	return applyDecorators(
		ApiOkResponse({
			schema: {
				allOf: [
					{
						properties: {
							items: {
								type: 'array',
								items: { $ref: getSchemaPath(data) }
							},
							meta: {
								type: 'object',
								properties: {
									itemCount: {
										type: 'number'
									},
									totalItems: {
										type: 'number'
									},
									itemsPerPage: {
										type: 'number'
									},
									totalPages: {
										type: 'number'
									},
									currentPage: {
										type: 'number'
									}
								},
								required: ['itemCount', 'totalItems', 'itemsPerPage', 'totalPages', 'currentPage']
							},
							links: {
								type: 'object',
								properties: {
									first: {
										type: 'string'
									},
									previous: {
										type: 'string'
									},
									next: {
										type: 'string'
									},
									last: {
										type: 'string'
									}
								},
								required: ['first', 'previous', 'next', 'last']
							}
						},
						required: ['items', 'meta']
					}
				]
			}
		})
	)
}
