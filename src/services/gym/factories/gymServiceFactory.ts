import { GymService } from '../gymService'
import { PrismaGymRepository } from '@/repositories/gym/prisma/prismaGymRepository'

export function GymServiceFactory() {
	const prismaGymRepository = new PrismaGymRepository()
	const gymService = new GymService(prismaGymRepository)

	return gymService
}