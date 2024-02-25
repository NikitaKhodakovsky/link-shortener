import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import type { BaseEntity } from '@app/typeorm-base-entity'

@Entity()
export class Click implements BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
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
