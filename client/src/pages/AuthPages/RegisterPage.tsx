import { Link, useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'
import { Form, Formik } from 'formik'
import toast from 'react-hot-toast'

import styles from './AuthPages.module.scss'

import { useRegisterMutation } from '../../mutations/useRegisterMutation'

import { useAuthManager } from '../../auth'

import { LoginFormValues } from './LoginPage'

import { FormikInput } from '../../components/FormikInput'

export interface RegisterFormValues extends LoginFormValues {
	confirmation: string
}

export const registerFormInitialValues: RegisterFormValues = {
	username: '',
	password: '',
	confirmation: ''
}

const registerFormValidationSchema = object({
	username: string().min(8, 'at least 8 characters').required('required'),
	password: string().min(8, 'at least 8 characters').required('required'),
	confirmation: string()
		.oneOf([ref('password')], "Passwords don't match")
		.required('required')
})

export function RegisterPage() {
	const { mutate } = useRegisterMutation()
	const authManager = useAuthManager()

	//TODO: Lock submit button
	const register = async ({ username, password }: RegisterFormValues) => {
		mutate(
			{ body: { username, password } },
			{
				onSuccess: () => {
					authManager.setAuth(true)
					toast('Welcome!')
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
				validationSchema={registerFormValidationSchema}
				initialValues={registerFormInitialValues}
				onSubmit={register}
			>
				<Form className={styles.content}>
					<h1 className="title">New Account</h1>
					<div className="input-list">
						<FormikInput name="username" label="Username" required placeholder="Some username" />
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
					<button className="button action" type="submit">
						Create
					</button>
					<p>
						Already have an account? <Link to="/login">Sign In</Link>
					</p>
				</Form>
			</Formik>
		</div>
	)
}
