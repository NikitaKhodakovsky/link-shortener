import { FieldValidator, Form, Formik } from 'formik'
import { object, ref, string } from 'yup'
import { Link } from 'react-router-dom'

import styles from './AuthPages.module.scss'

import { useRegisterMutation } from '../../mutations/useRegisterMutation'
import { toastErrorHandler } from '../../utils/toastErrorHandler'
import { checkUsername } from '../../__generated__/apiComponents'

import { FormikInput } from '../../components/FormikInput'
import { LoginFormValues } from './LoginPage'

const minUsernameLength = 4

export interface RegisterFormValues extends LoginFormValues {
	confirmation: string
}

export const registerFormInitialValues: RegisterFormValues = {
	username: '',
	password: '',
	confirmation: ''
}

const validateUsername: FieldValidator = async (username: string) => {
	if (username.length >= minUsernameLength) {
		const { isTaken } = await checkUsername({ pathParams: { username } })

		if (isTaken) return 'username is already taken'
	}
}

const registerFormValidationSchema = object({
	username: string().min(minUsernameLength, `at least ${minUsernameLength} characters`).required('required'),
	password: string().min(8, 'at least 8 characters').required('required'),
	confirmation: string()
		.oneOf([ref('password')], "passwords don't match")
		.required('required')
})

export function RegisterPage() {
	const { mutateAsync } = useRegisterMutation()

	const register = async ({ username, password }: RegisterFormValues) =>
		mutateAsync({ body: { username, password } }, { onError: toastErrorHandler })

	return (
		<div className={styles.wrapper}>
			<Formik
				validationSchema={registerFormValidationSchema}
				initialValues={registerFormInitialValues}
				onSubmit={register}
			>
				{({ isSubmitting }) => (
					<Form className={styles.content}>
						<h1 className="title">New Account</h1>
						<div className="input-list">
							<FormikInput
								name="username"
								label="Username"
								required
								placeholder="Some username"
								validate={validateUsername}
							/>
							<FormikInput
								name="password"
								label="Password"
								required
								placeholder="Min. 8 characters"
								type="password"
							/>
							<FormikInput
								name="confirmation"
								label="Password Confirmation"
								placeholder="Password Confirmation"
								required
								type="password"
							/>
						</div>
						<button className="button action" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Processing...' : 'Create account'}
						</button>
						<p>
							Already have an account? <Link to="/login">Sign In</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	)
}
