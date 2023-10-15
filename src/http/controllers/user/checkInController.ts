import { FastifyReply, FastifyRequest } from 'fastify'
import { checkInCreateParamsSchema, checkInSchema } from '@/utils/user/checkInUtils'
import { CheckInServiceFactory } from '@/services/user/factories/checkInServiceFactory'

export async function checkInController(req: FastifyRequest, res: FastifyReply) {
	const { gymId } = checkInCreateParamsSchema.parse(req.params)
	const { latitude, longitude } = checkInSchema.parse(req.body)

	const checkInServiceFactory = CheckInServiceFactory()
		
	await checkInServiceFactory.execute({
		gymId,
		userId: req.user.sub,
		userLatitude: latitude,
		userLongitude: longitude
	})

	return res.status(201).send()
}