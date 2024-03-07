import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from '@app/auth-validation-rules'
import { FieldValidator, Form, Formik } from 'formik'
import { object, ref, string } from 'yup'
import { Link } from 'react-router-dom'

import styles from './AuthPages.module.scss'

import { useRegisterMutation } from 'mutations/useRegisterMutation'
import { toastErrorHandler } from 'utils/toastErrorHandler'
import { checkUsername } from 'swagger/auth/components'
import { FormikInput } from 'components/FormikInput'
import { LoginFormValues } from './LoginPage'
import { useTitle } from 'hooks/useTitle'

export interface RegisterFormValues extends LoginFormValues {
	confirmation: string
}

export const registerFormInitialValues: RegisterFormValues = {
	username: '',
	password: '',
	confirmation: ''
}

const validateUsername: FieldValidator = async (username: string) => {
	if (username.length >= USERNAME_MIN_LENGTH) {
		const { isTaken } = await checkUsername({ pathParams: { username } })

		if (isTaken) return 'username is already taken'
	}
}

const registerFormValidationSchema = object({
	username: string()
		.min(USERNAME_MIN_LENGTH, `at least ${USERNAME_MIN_LENGTH} characters`)
		.max(USERNAME_MAX_LENGTH, `should be shorten than ${USERNAME_MAX_LENGTH}`)
		.required('required'),
	password: string()
		.min(PASSWORD_MIN_LENGTH, `at least ${PASSWORD_MIN_LENGTH} characters`)
		.max(PASSWORD_MAX_LENGTH, `should be shorten than ${PASSWORD_MAX_LENGTH}`)
		.required('required'),
	confirmation: string()
		.oneOf([ref('password')], "passwords don't match")
		.required('required')
})

export function RegisterPage() {
	const { mutateAsync } = useRegisterMutation()

	useTitle('New Account | Link Shortener')

	const register = async ({ username, password }: RegisterFormValues) =>
		mutateAsync({ body: { username, password } }, { onError: toastErrorHandler })

	return (
		<div className={styles.wrapper}>
			<Formik validationSchema={registerFormValidationSchema} initialValues={registerFormInitialValues} onSubmit={register}>
				{({ isSubmitting }) => (
					<Form className={styles.content} autoComplete="off">
						<h1 className="title">New Account</h1>
						<div className="input-list">
							<FormikInput
								name="username"
								label="Username"
								required
								placeholder="Some username"
								validate={validateUsername}
							/>
							<FormikInput name="password" label="Password" required placeholder="Min. 8 characters" type="password" />
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
