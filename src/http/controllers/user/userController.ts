import { userSchema } from '@/utils/user/userUtils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { userService } from '@/services/user/userService'

export async function userController(req: FastifyRequest, res: FastifyReply) {
	const { name, email, password } = userSchema.parse(req.body)

	try {
		await userService({
			name,
			email,
			password
		})
	} catch (error) {
		return res.status(409).send()
	}

	return res.status(201).send()
}