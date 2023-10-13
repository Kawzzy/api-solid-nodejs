import { FetchNearbyGymService } from '../fetchNearbyGymService'
import { PrismaGymRepository } from '@/repositories/gym/prisma/prismaGymRepository'

export function FetchNearbyGymServiceFactory() {
	const prismaGymRepository = new PrismaGymRepository()
	const fetchNearbyGymService = new FetchNearbyGymService(prismaGymRepository)

	return fetchNearbyGymService
}