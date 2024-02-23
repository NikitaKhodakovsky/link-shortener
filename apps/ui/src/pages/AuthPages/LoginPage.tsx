import { Form, Formik, FormikHelpers } from 'formik'
import { Link } from 'react-router-dom'
import { object, string } from 'yup'

import styles from './AuthPages.module.scss'

import { useLoginMutation } from '../../mutations/useLoginMutation'
import { toastErrorHandler } from '../../utils/toastErrorHandler'

import { FormikInput } from '../../components/FormikInput'

export interface LoginFormValues {
	username: string
	password: string
}

export const loginFormInitialValues: LoginFormValues = {
	username: '',
	password: ''
}

export const loginFormValidationSchema = object({
	username: string().required('required'),
	password: string().required('required')
})

export function LoginPage() {
	const { mutateAsync } = useLoginMutation()

	const login = async ({ username, password }: LoginFormValues, _: FormikHelpers<LoginFormValues>) =>
		mutateAsync({ body: { username, password } }, { onError: toastErrorHandler })

	return (
		<div className={styles.wrapper}>
			<Formik validationSchema={loginFormValidationSchema} initialValues={loginFormInitialValues} onSubmit={login}>
				{({ isSubmitting }) => (
					<Form className={styles.content} autoComplete="off">
						<h1 className="title">Sign In</h1>
						<div className="input-list">
							<FormikInput name="username" label="Username" required placeholder="Your username" />
							<FormikInput name="password" label="Password" required placeholder="Your password" type="password" />
						</div>
						<button className="button action" type="submit" disabled={isSubmitting}>
							{isSubmitting ? 'Processing...' : 'Sign In'}
						</button>
						<p>
							Not registered yet? <Link to="/register">Create an Account</Link>
						</p>
					</Form>
				)}
			</Formik>
		</div>
	)
}
