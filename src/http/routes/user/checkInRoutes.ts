import { checkInController } from '@/http/controllers/user/checkInController'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { FastifyInstance } from 'fastify'

export async function checkInRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.post('/gyms/:gymId/checkIns', checkInController)
}