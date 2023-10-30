import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verifyJWT'
import { verifyUserRole } from '@/http/middlewares/verifyUserRole'
import { gymController } from '@/http/controllers/gym/gymController'
import { searchGymController } from '@/http/controllers/gym/searchGymController'
import { fetchNearbyGymController } from '@/http/controllers/gym/fetchNearbyGymController'

export async function gymRoutes(app: FastifyInstance) {
	app.addHook('onRequest', verifyJWT)
  
	app.post('/create', { onRequest: [verifyUserRole('ADMIN')] }, gymController)
	app.get('/search', searchGymController)
	app.get('/nearby', fetchNearbyGymController)
}