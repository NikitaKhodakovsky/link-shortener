import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { User } from '../user/user.entity'

@Entity()
export class Link {
	@PrimaryGeneratedColumn()
	id: number

	@UpdateDateColumn({ name: 'created_at' })
	createdAt: Date

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
	user: User | undefined

	@Column()
	name: string

	@Column()
	destination: string
}
