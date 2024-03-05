import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Click {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@Index('idx_click_link_id')
	@Column({ type: 'integer' })
	linkId: number

	@Column()
	date: Date

	@Column({ type: 'varchar', nullable: true })
	userAgent: string | null

	@Column({ type: 'varchar', nullable: true })
	platform: string | null

	@Column({ type: 'varchar', nullable: true })
	browser: string | null

	@Column({ type: 'varchar', nullable: true })
	os: string | null

	@Column({ type: 'varchar', nullable: true })
	device: string | null

	@Column({ type: 'varchar', nullable: true })
	ip: string | null

	@Column({ type: 'varchar', nullable: true })
	country: string | null

	@Column({ type: 'varchar', nullable: true })
	region: string | null

	@Column({ type: 'varchar', nullable: true })
	city: string | null
}
