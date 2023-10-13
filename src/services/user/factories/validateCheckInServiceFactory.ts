import { ValidateCheckInService } from '../validateCheckInService'
import { PrismaCheckInRepository } from '@/repositories/user/prisma/prismaCheckInRepository'

export function ValidateCheckInServiceFactory() {
	const prismaCheckInRepository = new PrismaCheckInRepository()
	const validateCheckInService = new ValidateCheckInService(prismaCheckInRepository)

	return validateCheckInService
}