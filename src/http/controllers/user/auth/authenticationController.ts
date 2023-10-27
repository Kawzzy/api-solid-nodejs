import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticationUserSchema } from '@/utils/user/userUtils'
import { InvalidCredentialsError } from '@/services/user/errors/invalidCredentialsError'
import { AuthenticationServiceFactory } from '@/services/user/factories/authenticationServiceFactory'

export async function authenticationController(req: FastifyRequest, res: FastifyReply) {
	const { email, password } = authenticationUserSchema.parse(req.body)

	try {

		const authenticationService = AuthenticationServiceFactory()
		
		const { user } = await authenticationService.execute({
			email,
			password
		})

		const token = await res.jwtSign({}, {
			sign: {
				sub: user.id
			}
		})

		const refreshToken = await res.jwtSign({}, {
			sign: {
				sub: user.id,
				expiresIn: '7d'				
			}
		})
		
		return res
			.setCookie('refreshToken', refreshToken, {
				path: '/',
				secure: true,
				sameSite: true,
				httpOnly: true
			})
			.status(200)
			.send({ token })
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return res.status(400).send({ message: error.message })
		}

		throw error
	}
}