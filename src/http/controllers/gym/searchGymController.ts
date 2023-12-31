import { FastifyReply, FastifyRequest } from 'fastify'
import { gymQueryParamsSchema } from '@/utils/gym/gymUtils'
import { SearchGymServiceFactory } from '@/services/gym/factories/searchGymServiceFactory'

export async function searchGymController(req: FastifyRequest, res: FastifyReply) {
	const { query, page } = gymQueryParamsSchema.parse(req.query)

	const searchGymService = SearchGymServiceFactory()
		
	const { gyms } = await searchGymService.execute({
		query,
		page
	})

	return res.status(200).send({ gyms })
}