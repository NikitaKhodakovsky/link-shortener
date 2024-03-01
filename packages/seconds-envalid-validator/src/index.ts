import { makeValidator } from 'envalid'
import ms from 'ms'

export const seconds = makeValidator<number>((input: string) => {
	const coerced = Number(input)

	const result: number | undefined = isNaN(coerced) ? ms(input) / 1000 : Math.round(coerced)

	if (typeof result !== 'number') throw new Error('Invalid input')
	if (result < 0) throw new Error('Cannot be less that zero')

	return result
})
