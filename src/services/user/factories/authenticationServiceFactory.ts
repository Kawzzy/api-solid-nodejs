import { AuthenticationService } from '../auth/authenticationService'
import { PrismaUserRepository } from '@/repositories/user/prisma/prismaUserRepository'

export function AuthenticationServiceFactory() {
	const prismaUserRepository = new PrismaUserRepository()
	const authenticationService = new AuthenticationService(prismaUserRepository)

	return authenticationService
}