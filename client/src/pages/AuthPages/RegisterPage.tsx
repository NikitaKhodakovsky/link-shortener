import { Link, useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'
import { Form, Formik } from 'formik'

import styles from './AuthPages.module.scss'

import { FormikInput } from '../../components/FormikInput'
import { LoginFormValues } from './LoginPage'

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
	const navigate = useNavigate()

	const register = async (data: RegisterFormValues) => {
		//TODO: Lock submit button
		console.log('Register request...', data)
		navigate('/')
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
