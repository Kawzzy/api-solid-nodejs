import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'
import { AuthenticationService } from './authenticationService'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'

describe('Services', () => {
	describe('Authentication service', () => {

		it('should authenticate successfully', async () => {

			const inMemoryUserRepository = new InMemoryUserRepository()
			const authenticationService = new AuthenticationService(inMemoryUserRepository)

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

			const inMemoryUserRepository = new InMemoryUserRepository()
			const authenticationService = new AuthenticationService(inMemoryUserRepository)
      
			expect(() =>
				authenticationService.execute({ email: 'johndoe@test.com', password: '123456' })
			).rejects.toBeInstanceOf(InvalidCredentialsError)
		})
		
		it('should not authenticate with unregistered password', async () => {

			const inMemoryUserRepository = new InMemoryUserRepository()
			const authenticationService = new AuthenticationService(inMemoryUserRepository)
      
			await inMemoryUserRepository.create({
				name: 'John Doe',
				email: 'johndoe@test.com',
				passwordHash: await hash('123456', 6)
			})

			expect(() =>
				authenticationService.execute({ email: 'johndoe@test.com', password: '123123' })
			).rejects.toBeInstanceOf(InvalidCredentialsError)
		})
	})
})