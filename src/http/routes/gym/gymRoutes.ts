import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { SearchGymController } from '@/http/controllers/gym/searchGymController'

export async function gymRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/search', SearchGymController)
}