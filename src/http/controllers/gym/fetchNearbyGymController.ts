import { gymSchema } from '@/utils/gym/gymUtils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { FetchNearbyGymServiceFactory } from '@/services/gym/factories/fetchNearbyGymServiceFactory'

export async function fetchNearbyGymController(req: FastifyRequest, res: FastifyReply) {
	const { latitude, longitude } = gymSchema
		.omit({ name: true, description: true, phone: true })
		.parse(req.body)

	const fetchNearbyGymServiceFactory = FetchNearbyGymServiceFactory()
		
	const { gyms } = await fetchNearbyGymServiceFactory.execute({
		userLatitude: latitude,
		userLongitude: longitude
	})

	return res.status(201).send({ gyms })
}