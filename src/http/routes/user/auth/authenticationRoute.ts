import { FastifyInstance } from 'fastify'
import { authenticationController } from '@/http/controllers/user/auth/authenticationController'
import { refreshTokenController } from '@/http/controllers/user/auth/refreshTokenController'

export async function authenticationRoute(app: FastifyInstance) {
	app.post('/', authenticationController)
	app.patch('/token/refresh', refreshTokenController)
}