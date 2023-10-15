import { FastifyReply, FastifyRequest } from 'fastify'
import { checkInValidateParamsSchema } from '@/utils/user/checkInUtils'
import { ValidateCheckInServiceFactory } from '@/services/user/factories/validateCheckInServiceFactory'

export async function validateCheckInController(req: FastifyRequest, res: FastifyReply) {
	const { checkInId } = checkInValidateParamsSchema.parse(req.params)

	const validateCheckInServiceFactory = ValidateCheckInServiceFactory()
		
	await validateCheckInServiceFactory.execute({
		checkInId
	})

	return res.status(204).send()
}