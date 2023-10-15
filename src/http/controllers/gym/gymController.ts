import { gymSchema } from '@/utils/gym/gymUtils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { GymServiceFactory } from '@/services/gym/factories/gymServiceFactory'

export async function GymController(req: FastifyRequest, res: FastifyReply) {
	const { name, description, phone, latitude, longitude } = gymSchema.parse(req.body)

	const gymService = GymServiceFactory()
		
	await gymService.createGym({
		name,
		description,
		phone,
		latitude,
		longitude
	})

	return res.status(201).send()
}