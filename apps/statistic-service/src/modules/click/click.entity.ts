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
	userAgent: string | null

	@Column({ nullable: true })
	platform: string | null

	@Column({ nullable: true })
	browser: string | null

	@Column({ nullable: true })
	os: string | null

	@Column({ nullable: true })
	device: string | null

	@Column({ nullable: true })
	ip: string | null

	@Column({ nullable: true })
	country: string | null

	@Column({ nullable: true })
	region: string | null

	@Column({ nullable: true })
	city: string | null
}
