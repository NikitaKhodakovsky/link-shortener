import { Column, Entity, ManyToOne } from 'typeorm'

import { BaseEntity } from '../../common/base.entity'
import { Link } from '../link/link.entity'

@Entity()
export class Click extends BaseEntity {
	@ManyToOne(() => Link, { onDelete: 'CASCADE' })
	link: Link | undefined

	@Column({ nullable: true })
	platform: string

	@Column({ nullable: true })
	browser: string

	@Column({ nullable: true })
	os: string

	@Column({ nullable: true })
	ip: string

	@Column({ nullable: true })
	country: string

	@Column({ nullable: true })
	region: string

	@Column({ nullable: true })
	city: string
}
