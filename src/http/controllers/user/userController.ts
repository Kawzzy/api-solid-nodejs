import { prisma } from '@/lib/prisma'
import { userSchema } from '@/utils/user/userUtils'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function userController(req: FastifyRequest, res: FastifyReply) {
	const { name, email, password } = userSchema.parse(req.body)

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash: password
		}
	})

	return res.status(201).send()
}