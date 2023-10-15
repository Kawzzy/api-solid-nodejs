import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { checkInController } from '@/http/controllers/user/checkInController'
import { getUserMetricsController } from '@/http/controllers/user/getUserMetricsController'
import { validateCheckInController } from '@/http/controllers/user/validateCheckInController'
import { fetchUserCheckInHistoryController } from '@/http/controllers/user/fetchUserCheckInHistoryController'

export async function checkInRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.post('/gyms/:gymId/checkIns', checkInController)
	app.get('/checkIns/metrics', getUserMetricsController)
	app.get('/checkIns/history', fetchUserCheckInHistoryController)
	app.patch('/checkIns/:checkInId/validate', validateCheckInController)
}