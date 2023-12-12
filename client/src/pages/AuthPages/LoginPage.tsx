import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { object, string } from 'yup'
import toast from 'react-hot-toast'

import styles from './AuthPages.module.scss'

import { useLoginMutation } from '../../mutations/useLoginMutation'

import { useAuthManager } from '../../auth'

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
	const authManager = useAuthManager()
	const { mutate } = useLoginMutation()

	//TODO: Lock submit button

	const login = async ({ username, password }: LoginFormValues) => {
		mutate(
			{ body: { username, password } },
			{
				onSuccess: () => {
					authManager.setAuth(true)
					toast('Welcome to LinkShortener!')
				},
				onError: (error) => {
					toast(typeof error.payload === 'object' ? error.payload.message : 'Something went wrong')
				}
			}
		)
	}

	return (
		<div className={styles.wrapper}>
			<Formik
				validationSchema={loginFormValidationSchema}
				initialValues={loginFormInitialValues}
				onSubmit={login}
			>
				<Form className={styles.content}>
					<h1 className="title">Sign In</h1>
					<div className="input-list">
						<FormikInput name="username" label="Username" required placeholder="Your username" />
						<FormikInput
							name="password"
							label="Password"
							required
							placeholder="Your password"
							type="password"
						/>
					</div>
					<button className="button action" type="submit">
						Sign In
					</button>
					<p>
						Not registered yet? <Link to="/register">Create an Account</Link>
					</p>
				</Form>
			</Formik>
		</div>
	)
}
