import { UserService } from '../userService'
import { PrismaUserRepository } from '@/repositories/user/prisma/prismaUserRepository'

export function UserServiceFactory() {
	const prismaUserRepository = new PrismaUserRepository()
	const userService = new UserService(prismaUserRepository)

	return userService
}