import fastify from 'fastify'

import { env } from './env'
import { ZodError } from 'zod'
import { userRoutes } from './http/routes/user/userRoutes'
import { authenticationRoute } from './http/routes/user/auth/authenticationRoute'

export const app = fastify()

app.register(userRoutes, {
	prefix: 'users'
})
app.register(authenticationRoute, {
	prefix: 'auth'
})

app.setErrorHandler((error, req, res) => {
	if (error instanceof ZodError) {
		return res.status(400).send({
			message: 'Validation error',
			issues: error.format()
		})
	}

	if (env.NODE_ENV !== 'prod') {
		console.error(error)
	}

	return res.status(500).send({ message: 'Internal server error!' })
})