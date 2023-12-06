import { User } from '../user/user.entity'
import { Link } from './link.entity'

export interface CreateLinkArguments {
	user: User
	name: string
	destination: string
	backHalf: string
}

export function createLink({ user, name, backHalf, destination }: CreateLinkArguments) {
	const link = new Link()

	link.destination = destination
	link.backhalf = backHalf
	link.name = name
	link.user = user

	return link
}
