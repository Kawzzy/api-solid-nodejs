import { GetUserProfileServiceFactory } from '@/services/user/factories/getUserProfileServiceFactory'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profileController(req: FastifyRequest, res: FastifyReply) {
	await req.jwtVerify()

	const getUserProfile = GetUserProfileServiceFactory()

	const { user } = await getUserProfile.execute({
		userId: req.user.sub
	})
  
	return res.status(200).send({
		user: {
			...user,
			passwordHash: undefined
		}
	})
}