import { Request, Response } from 'express'

import { SESSION_COOKIE_NAME } from '../../config/constants'

export async function destroySession(req: Request, res: Response): Promise<boolean> {
	return new Promise((resolve, reject) => {
		req.session.destroy((e) => {
			if (e) reject(e)

			res.clearCookie(SESSION_COOKIE_NAME)

			resolve(true)
		})
	})
}
