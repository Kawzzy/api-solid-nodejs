import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticationUserSchema } from '@/utils/user/userUtils'
import { InvalidCredentialsError } from '@/services/user/errors/invalidCredentialsError'
import { AuthenticationServiceFactory } from '@/services/user/factories/authenticationServiceFactory'

export async function authenticationController(req: FastifyRequest, res: FastifyReply) {
	const { email, password } = authenticationUserSchema.parse(req.body)

	try {

		const authenticationService = AuthenticationServiceFactory()
		
		await authenticationService.execute({
			email,
			password
		})
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return res.status(400).send({ message: error.message })
		}

		throw error
	}

	return res.status(200).send()
}