import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticationService } from './authenticationService'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'

let inMemoryUserRepository: InMemoryUserRepository
let authenticationService: AuthenticationService

describe('Services', () => {
	describe('Authentication service', () => {

		beforeEach(() => {
			inMemoryUserRepository = new InMemoryUserRepository()
			authenticationService = new AuthenticationService(inMemoryUserRepository)
		})

		it('should authenticate successfully', async () => {

			const password = '123456'

			await inMemoryUserRepository.create({
				name: 'John Doe',
				email: 'johndoe@test.com',
				passwordHash: await hash(password, 6)
			})

			const { user } = await authenticationService.execute({ email: 'johndoe@test.com', password })

			expect(user.id).toEqual(expect.any(String))
		})
		
		it('should not authenticate with unregistered email', async () => {
      
			await expect(() =>
				authenticationService.execute({ email: 'johndoe@test.com', password: '123456' })
			).rejects.toBeInstanceOf(InvalidCredentialsError)
		})
		
		it('should not authenticate with unregistered password', async () => {
      
			await inMemoryUserRepository.create({
				name: 'John Doe',
				email: 'johndoe@test.com',
				passwordHash: await hash('123456', 6)
			})

			await expect(() =>
				authenticationService.execute({ email: 'johndoe@test.com', password: '123123' })
			).rejects.toBeInstanceOf(InvalidCredentialsError)
		})
	})
})