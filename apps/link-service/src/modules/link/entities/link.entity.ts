import { BaseEntity } from '@app/typeorm-base-entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

@Entity()
export class Link extends BaseEntity {
	@ApiHideProperty()
	@Column({ type: 'integer', select: false })
	userId?: number

	@Column({ unique: true })
	backhalf: string

	@Column()
	name: string

	@Column()
	destination: string
}
