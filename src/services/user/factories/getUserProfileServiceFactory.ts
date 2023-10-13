import { GetUserProfileService } from '../getUserProfileService'
import { PrismaUserRepository } from '@/repositories/user/prisma/prismaUserRepository'

export function GetUserProfileServiceFactory() {
	const prismaUserRepository = new PrismaUserRepository()
	const getUserProfileServiceFactory = new GetUserProfileService(prismaUserRepository)

	return getUserProfileServiceFactory
}