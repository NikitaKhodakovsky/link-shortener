import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'

@Entity()
export class Link {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@ApiHideProperty()
	@Index('idx_link_user_id')
	@Column({ type: 'integer', select: false })
	userId?: number

	@Column({ unique: true })
	backhalf: string

	@Column()
	name: string

	@Column()
	destination: string
}
