import { CheckInService } from '../checkInService'
import { PrismaGymRepository } from '@/repositories/gym/prisma/prismaGymRepository'
import { PrismaCheckInRepository } from '@/repositories/user/prisma/prismaCheckInRepository'

export function CheckInServiceFactory() {
	const prismaCheckInRepository = new PrismaCheckInRepository()
	const prismaGymRepository = new PrismaGymRepository()
	const checkInService = new CheckInService(prismaCheckInRepository, prismaGymRepository)

	return checkInService
}