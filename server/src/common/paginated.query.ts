import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, Max, Min } from 'class-validator'

export class PaginatedQuery {
	@IsInt()
	@Min(1)
	@ApiPropertyOptional({ default: 1 })
	page: number = 1

	@IsInt()
	@Min(1)
	@Max(60)
	@ApiPropertyOptional({ default: 20 })
	perPage: number = 20
}
