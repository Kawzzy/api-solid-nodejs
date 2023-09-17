import fastify from 'fastify'

import { userRoutes } from './http/routes/user/userRoutes'

export const app = fastify()

app.register(userRoutes, {
	prefix: 'users'
})
