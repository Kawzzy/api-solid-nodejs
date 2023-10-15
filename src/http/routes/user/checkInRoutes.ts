import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { checkInController } from '@/http/controllers/user/checkInController'
import { getUserMetricsController } from '@/http/controllers/user/getUserMetricsController'
import { fetchUserCheckInHistoryController } from '@/http/controllers/user/fetchUserCheckInHistoryController'

export async function checkInRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/checkIns/history', fetchUserCheckInHistoryController)
	app.get('/checkIns/metrics', getUserMetricsController)
	app.post('/gyms/:gymId/checkIns', checkInController)
}