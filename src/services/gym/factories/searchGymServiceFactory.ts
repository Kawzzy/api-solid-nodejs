import { SearchGymService } from '../searchGymService'
import { PrismaGymRepository } from '@/repositories/gym/prisma/prismaGymRepository'

export function SearchGymServiceFactory() {
	const prismaGymRepository = new PrismaGymRepository()
	const searchGymService = new SearchGymService(prismaGymRepository)

	return searchGymService
}