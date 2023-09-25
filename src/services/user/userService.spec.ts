import { compare } from 'bcryptjs'
import { UserService } from './userService'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'

let inMemoryUserRepository: InMemoryUserRepository
let userService: UserService

describe('Services', () => {
	describe('User service', () => {

		beforeEach(() => {
			inMemoryUserRepository = new InMemoryUserRepository()
			userService = new UserService(inMemoryUserRepository)
		})

		it('should complete registration successfully', async () => {

			const password = '123456'

			const { user } = await userService.createUser({
				name: 'John Doe',
				email: 'johndoe@test.com',
				password
			})

			expect(user.id).toEqual(expect.any(String))
		})

		it('should hash the users password on registration', async () => {

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

			const email = 'johndoe@test.com'
			const password = '123456'

			await userService.createUser({
				name: 'John Doe',
				email,
				password
			})

			await expect(() =>
				userService.createUser({
					name: 'John Doe',
					email,
					password
				})
			).rejects.toBeInstanceOf(UserAlreadyExistsError)
		})
	})
})