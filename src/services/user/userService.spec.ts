import { compare } from 'bcryptjs'
import { UserService } from './userService'
import { describe, expect, it } from 'vitest'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'

describe('Services', () => {
	describe('User service', () => {
		it('should complete registration successfully', async () => {
			const inMemoryUserRepository = new InMemoryUserRepository()
			const userService = new UserService(inMemoryUserRepository)

			const password = '123456'

			const { user } = await userService.createUser({
				name: 'John Doe',
				email: 'johndoe@test.com',
				password
			})

			expect(user.id).toEqual(expect.any(String))
		})

		it('should hash the users password on registration', async () => {
			const inMemoryUserRepository = new InMemoryUserRepository()
			const userService = new UserService(inMemoryUserRepository)

			const password = '123456'

			const { user } = await userService.createUser({
				name: 'John Doe',
				email: 'johndoe@test.com',
				password
			})

			const isSameHash = await compare(password, user.passwordHash)

			expect(isSameHash).toBe(true)
		})
		
		it('should not be possible to register with same email twice', async () => {
			const inMemoryUserRepository = new InMemoryUserRepository()
			const userService = new UserService(inMemoryUserRepository)

			const email = 'johndoe@test.com'
			const password = '123456'

			await userService.createUser({
				name: 'John Doe',
				email,
				password
			})

			expect(() =>
				userService.createUser({
					name: 'John Doe',
					email,
					password
				})
			).rejects.toBeInstanceOf(UserAlreadyExistsError)
		})
	})
})