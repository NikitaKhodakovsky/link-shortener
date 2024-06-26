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
	name: string().trim().required('required'),
	destination: string().trim().url('should include protocol, host and tld').required('required')
})

export function LinkModal({ title, buttonText = 'Save', isOpen, closeHandler, values, onSubmit }: LinkModalProps) {
	const submitHandler = async ({ name, destination }: LinkFormValues) => {
		if (onSubmit) await onSubmit({ name: name.trim(), destination: destination.trim() })
		closeHandler()
	}

	return (
		<Modal {...{ title, buttonText, isOpen, closeHandler }}>
			<Formik
				initialValues={{ ...(values || linkFormInitialValues) }}
				validationSchema={linkFormValidationSchema}
				onSubmit={submitHandler}
			>
				{({ isSubmitting }) => (
					<Form autoComplete="off">
						<div className="input-list">
							<FormikInput label="Name" name="name" required placeholder="Name your link" />
							<FormikInput label="Destination" name="destination" required placeholder="https://google.com" />
						</div>
						<div className="actions">
							<button className="button transparent" type="reset" onClick={closeHandler}>
								Cancel
							</button>
							<button className="button action" type="submit" disabled={isSubmitting}>
								{isSubmitting ? 'Processing...' : buttonText}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	)
}
