import { FastifyInstance } from 'fastify'
import { authenticationController } from '@/http/controllers/user/auth/authenticationController'

export async function authenticationRoute(app: FastifyInstance) {
	app.post('/', authenticationController)
}