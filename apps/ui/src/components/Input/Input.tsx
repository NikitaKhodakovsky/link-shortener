import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import styles from './Input.module.scss'

export interface BaseProps {
	label: string
	required?: boolean
	error?: string
	id?: string
}

export interface InputProps
	extends BaseProps,
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export function Input({ label, required, id, className, error, ...other }: InputProps) {
	return (
		<div className={`${styles.wrap} ${error ? styles.error : ''} ${className ?? ''}`}>
			<label htmlFor={id || label}>
				{label}
				{required ? <span>*</span> : ''}
			</label>
			{error && <p className={styles.message}>{error}</p>}
			<input id={id || label} {...other} />
		</div>
	)
}
