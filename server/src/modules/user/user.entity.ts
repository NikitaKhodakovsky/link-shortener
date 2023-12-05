import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date

	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@Column()
	salt: string
}
