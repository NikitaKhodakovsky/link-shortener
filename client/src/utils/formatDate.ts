function x(str: string | number) {
	str = str.toString()

	return str.length > 1 ? str : `0${str}`
}

export function formatDate(date: Date | string) {
	if (typeof date === 'string') {
		date = new Date(date)
	}

	return `${date.getFullYear()}-${x(date.getMonth() + 1)}-${x(date.getDate())}, ${x(date.getHours())}:${x(
		date.getMinutes()
	)}`
}
