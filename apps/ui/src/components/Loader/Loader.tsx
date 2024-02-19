import { DetailedHTMLProps, HTMLAttributes } from 'react'
import styles from './Loader.module.scss'

export interface LoaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Loader({ className, ...props }: LoaderProps) {
	return (
		<div className={`${styles.wrap} ${className ?? ''}`} {...props}>
			<span className={styles.loader}></span>
		</div>
	)
}
