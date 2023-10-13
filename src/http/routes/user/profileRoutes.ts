import { FastifyInstance } from 'fastify'
import { profileController } from '@/http/controllers/user/profileController'

export async function profileRoutes(app: FastifyInstance) {
	app.get('/', profileController)
}