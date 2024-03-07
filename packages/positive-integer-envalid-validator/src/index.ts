import { makeValidator } from 'envalid'

export const positiveInteger = makeValidator<number>((input: string) => {
	const coerced = Number(input)

	if (!Number.isInteger(coerced)) throw new Error('Should be integer')
	if (coerced < 0) throw new Error('Should be positive')

	return coerced
})
