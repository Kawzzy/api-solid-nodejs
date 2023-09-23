import { userSchema } from '@/utils/user/userUtils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '@/services/user/userService'
import { PrismaUserRepository } from '@/repositories/user/prisma/prismaUserRepository'
import { UserAlreadyExistsError } from '@/services/user/errors/userAlreadyExistsError'

export async function userController(req: FastifyRequest, res: FastifyReply) {
	const { name, email, password } = userSchema.parse(req.body)

	try {
		const prismaUserRepository = new PrismaUserRepository()
		const userService = new UserService(prismaUserRepository)
		
		await userService.createUser({
			name,
			email,
			password
		})
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return res.status(409).send({ message: error.message })
		}

		throw error
	}

	return res.status(201).send()
}