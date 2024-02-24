import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export abstract class BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	@ApiProperty()
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	@ApiProperty()
	updatedAt: Date
}
