import { FastifyInstance } from 'fastify'
import { userController } from '@/http/controllers/user/userController'

export async function userRoutes(app: FastifyInstance) {
	app.post('/', userController)
}