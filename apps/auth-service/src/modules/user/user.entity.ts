import { BaseEntity } from '@app/typeorm-base-entity'
import { ApiHideProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
	@Column({ unique: true })
	username: string

	@Column({ select: false })
	@ApiHideProperty()
	password: string

	@Column({ select: false })
	@ApiHideProperty()
	salt: string
}
