import { FastifyReply, FastifyRequest } from 'fastify'
import { authenticationUserSchema } from '@/utils/user/userUtils'
import { AuthenticationService } from '@/services/user/auth/authenticationService'
import { PrismaUserRepository } from '@/repositories/user/prisma/prismaUserRepository'
import { InvalidCredentialsError } from '@/services/user/errors/invalidCredentialsError'

export async function authenticationController(req: FastifyRequest, res: FastifyReply) {
	const { email, password } = authenticationUserSchema.parse(req.body)

	try {
		const prismaUserRepository = new PrismaUserRepository()
		const authenticationService = new AuthenticationService(prismaUserRepository)
		
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