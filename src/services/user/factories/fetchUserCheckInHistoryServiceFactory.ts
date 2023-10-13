import { FetchUserCheckInHistoryService } from '../fetchUserCheckInHistoryService'
import { PrismaCheckInRepository } from '@/repositories/user/prisma/prismaCheckInRepository'

export function FetchUserCheckInHistoryServiceFactory() {
	const prismaCheckInRepository = new PrismaCheckInRepository()
	const fetchUserCheckInHistoryService = new FetchUserCheckInHistoryService(prismaCheckInRepository)

	return fetchUserCheckInHistoryService
}