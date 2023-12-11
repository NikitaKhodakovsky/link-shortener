import { Formik, Form } from 'formik'
import { object, string } from 'yup'

import { Modal, ModalProps } from './Modal'
import { FormikInput } from './FormikInput'

export interface LinkFormValues {
	name: string
	destination: string
}

export interface LinkModalProps extends ModalProps {
	onSubmit?: (data: any) => any
	values?: LinkFormValues
	buttonText?: string
}

export const linkFormInitialValues: LinkFormValues = {
	name: '',
	destination: ''
}

export const linkFormValidationSchema = object({
	name: string().required('required'),
	destination: string().url('should include protocol, host and tld').required('required')
})

export function LinkModal({ title, buttonText, isOpen, closeHandler, values, onSubmit }: LinkModalProps) {
	const submitHandler = async (data: LinkFormValues) => {
		if (onSubmit) await onSubmit(data)
		closeHandler()
	}

	return (
		<Modal {...{ title, buttonText, isOpen, closeHandler }}>
			<Formik
				initialValues={{ ...(values || linkFormInitialValues) }}
				validationSchema={linkFormValidationSchema}
				onSubmit={submitHandler}
			>
				<Form>
					<div className="input-list">
						<FormikInput label="Name" name="name" required placeholder="Name your link" />
						<FormikInput label="Destination" name="destination" required placeholder="https://google.com" />
					</div>
					<div className="actions">
						<button className="button transparent" type="reset" onClick={closeHandler}>
							Cancel
						</button>
						<button className="button action" type="submit">
							{buttonText ?? 'Save'}
						</button>
					</div>
				</Form>
			</Formik>
		</Modal>
	)
}
