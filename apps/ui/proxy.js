import { createURL } from '@app/url-builder'
import httpProxy from 'http-proxy'
/*  
# Production container serves from root (http://ui/).
# Vite serves files including index.html from BASE_URL, which is /dashboard (http://ui/dashboard).
# This proxy sends traffic from root to BASE_URL to get the same behavior for both development and production containers.
*/

const BASE_URL = process.env.BASE_URL ?? ''
const PROXY_PORT = process.env.PORT ?? 80
const VITE_PORT = 3000

const target = createURL({ protocol: 'http', host: 'localhost', port: VITE_PORT, pathname: BASE_URL })

httpProxy
	.createProxy({ target, ws: true })
	.on('error', e => console.error(e))
	.listen(PROXY_PORT)

console.log(`Proxying port: ${PROXY_PORT}, target: ${target}`)
