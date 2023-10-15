import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserMetricsServiceFactory } from '@/services/user/factories/getUserMetricsServiceFactory'

export async function getUserMetricsController(req: FastifyRequest, res: FastifyReply) {
	const getUserMetricsService = GetUserMetricsServiceFactory()
		
	const { checkInsCount } = await getUserMetricsService.execute({
		userId: req.user.sub
	})

	return res.status(200).send({ checkInsCount })
}