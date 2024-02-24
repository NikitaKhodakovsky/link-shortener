import type { BaseEntity } from '@app/typeorm-base-entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Click implements BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ name: 'created_at' })
	createdAt: Date

	@Column({ name: 'updated_at' })
	updatedAt: Date

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
