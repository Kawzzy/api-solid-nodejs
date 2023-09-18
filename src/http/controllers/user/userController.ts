import { userSchema } from '@/utils/user/userUtils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { UserService } from '@/services/user/userService'
import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository'

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
		return res.status(409).send()
	}

	return res.status(201).send()
}