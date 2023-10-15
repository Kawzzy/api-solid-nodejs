import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { SearchGymController } from '@/http/controllers/gym/searchGymController'
import { FetchNearbyGymController } from '@/http/controllers/gym/fetchNearbyGymController'

export async function gymRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)

	app.get('/search', SearchGymController)
	app.get('/nearby', FetchNearbyGymController)
}