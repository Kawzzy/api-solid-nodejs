import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { userSchema } from '@/utils/user/userUtils'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function userController(req: FastifyRequest, res: FastifyReply) {
	const { name, email, password } = userSchema.parse(req.body)

	const userExists = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (userExists) {
		return res.status(409).send()
	}

	const passwordHash = await hash(password, 6)

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash
		}
	})

	return res.status(201).send()
}