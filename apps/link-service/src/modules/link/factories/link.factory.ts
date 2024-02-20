import { Link } from '../entities'

export interface CreateLinkArguments {
	userId: number
	name: string
	destination: string
	backHalf: string
}

export function createLink({ userId, name, backHalf, destination }: CreateLinkArguments) {
	const link = new Link()

	link.destination = destination
	link.backhalf = backHalf
	link.userId = userId
	link.name = name

	return link
}
