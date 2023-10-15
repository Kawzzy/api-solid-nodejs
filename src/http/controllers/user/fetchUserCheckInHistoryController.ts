import { FastifyReply, FastifyRequest } from 'fastify'
import { checkInFetchUserHistorySchema } from '@/utils/user/checkInUtils'
import { FetchUserCheckInHistoryServiceFactory } from '@/services/user/factories/fetchUserCheckInHistoryServiceFactory'

export async function fetchUserCheckInHistoryController(req: FastifyRequest, res: FastifyReply) {
	const { page } = checkInFetchUserHistorySchema.parse(req.body)

	const fetchUserCheckInHistoryServiceFactory = FetchUserCheckInHistoryServiceFactory()
		
	const { checkIns } = await fetchUserCheckInHistoryServiceFactory.execute({
		userId: req.user.sub,
		page
	})

	return res.status(201).send({ checkIns })
}