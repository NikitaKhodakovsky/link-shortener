import toast from 'react-hot-toast'

export function toastErrorHandler(error: any) {
	if (error && typeof error === 'object') {
		if (typeof error.payload === 'object' && typeof error.payload.message === 'string') {
			return toast(error.payload.message)
		}
	}

	toast('Something went wrong')
}
