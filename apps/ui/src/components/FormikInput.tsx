import { FieldValidator, useField } from 'formik'

import { Input, InputProps } from './Input'

export interface FormikInputProps extends InputProps {
	validate?: FieldValidator
	name: string
}

export function FormikInput({ name, validate, ...other }: FormikInputProps) {
	const [field, { touched, error }] = useField({ name, validate })

	return <Input error={touched && error ? error : undefined} id={name} {...field} {...other} />
}
