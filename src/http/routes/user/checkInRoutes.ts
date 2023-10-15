import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { checkInController } from '@/http/controllers/user/checkInController'
import { fetchUserCheckInHistoryController } from '@/http/controllers/user/fetchUserCheckInHistoryController'

export async function checkInRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/checkIns/history', fetchUserCheckInHistoryController)
	app.post('/gyms/:gymId/checkIns', checkInController)
}