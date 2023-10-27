import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { ZodError } from 'zod'
import { fastifyJwt } from '@fastify/jwt'
import { gymRoutes } from './http/routes/gym/gymRoutes'
import { userRoutes } from './http/routes/user/userRoutes'
import { checkInRoutes } from './http/routes/user/checkInRoutes'
import { profileRoutes } from './http/routes/user/profileRoutes'
import { authenticationRoute } from './http/routes/user/auth/authenticationRoute'

export const app = fastify()

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
	cookie: {
		cookieName: 'refreshToken',
		signed: false
	},
	sign: {
		expiresIn: '10m'
	}
})

app.register(fastifyCookie)

app.register(userRoutes, {
	prefix: 'users'
})
app.register(authenticationRoute, {
	prefix: 'auth'
})
app.register(gymRoutes, {
	prefix: 'gyms'
})
app.register(profileRoutes, {
	prefix: 'me'
})
app.register(checkInRoutes)

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