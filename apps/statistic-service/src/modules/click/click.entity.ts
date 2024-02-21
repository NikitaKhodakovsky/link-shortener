import { BaseEntity } from '@app/typeorm-base-entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Click extends BaseEntity {
	@Column({ type: 'integer' })
	linkId: number

	@Column()
	date: Date

	@Column({ nullable: true })
	userAgent: string

	@Column({ nullable: true })
	platform: string

	@Column({ nullable: true })
	browser: string

	@Column({ nullable: true })
	os: string

	@Column({ nullable: true })
	device: string

	@Column({ nullable: true })
	ip: string

	@Column({ nullable: true })
	country: string

	@Column({ nullable: true })
	region: string

	@Column({ nullable: true })
	city: string
}
