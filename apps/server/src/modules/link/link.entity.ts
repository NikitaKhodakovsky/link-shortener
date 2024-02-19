import { Column, Entity, ManyToOne } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'

import { BaseEntity } from '../../common/base.entity'
import { User } from '../user/user.entity'

@Entity()
export class Link extends BaseEntity {
	@ApiHideProperty()
	@ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
	user: User | undefined

	@Column({ unique: true })
	backhalf: string

	@Column()
	name: string

	@Column()
	destination: string
}
