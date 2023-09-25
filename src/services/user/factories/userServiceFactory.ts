import { UserService } from '../userService'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'

export function UserServiceFactory() {
	const inMemoryUserRepository = new InMemoryUserRepository()
	const userService = new UserService(inMemoryUserRepository)

	return userService
}