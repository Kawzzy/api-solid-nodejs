import { GetUserMetricsService } from '../getUserMetricsService'
import { PrismaCheckInRepository } from '@/repositories/user/prisma/prismaCheckInRepository'

export function GetUserMetricsServiceFactory() {
	const prismaCheckInRepository = new PrismaCheckInRepository()
	const getUserMetricsService = new GetUserMetricsService(prismaCheckInRepository)

	return getUserMetricsService
}