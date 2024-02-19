import argon2 from 'argon2'
import crypto from 'crypto'

export interface PasswordHashingResult {
	hash: string
	salt: string
}

export abstract class PasswordHashingStrategy {
	abstract hash(password: string): PasswordHashingResult | Promise<PasswordHashingResult>
	abstract verify(password: string, hash: string, salt: string): boolean | Promise<boolean>
}

export class Argon2PasswordHashingStrategy extends PasswordHashingStrategy {
	public async hash(password: string) {
		const salt = crypto.randomBytes(20)

		const hash = await argon2.hash(password, { salt })

		return { hash, salt: salt.toString('hex') }
	}

	public verify(password: string, hash: string, salt: string) {
		return argon2.verify(hash, password, { salt: Buffer.from(salt) })
	}
}
