import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { profileController } from '@/http/controllers/user/profileController'

export async function profileRoutes(app: FastifyInstance) {
	app.get('/', { onRequest: [verifyJWT] }, profileController)
}