import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileService } from './getUserProfileService'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { InMemoryUserRepository } from '@/repositories/user/inMemory/inMemoryUserRepository'

let inMemoryUserRepository: InMemoryUserRepository
let getUserProfileService: GetUserProfileService

describe('Services', () => {
	describe('Get user profile service', () => {

		beforeEach(() => {
			inMemoryUserRepository = new InMemoryUserRepository()
			getUserProfileService = new GetUserProfileService(inMemoryUserRepository)
		})

		it('should return the users profile successfully', async () => {

			const password = '123456'

			const createdUser = await inMemoryUserRepository.create({
				name: 'John Doe',
				email: 'johndoe@test.com',
				passwordHash: await hash(password, 6)
			})

			const { user } = await getUserProfileService.execute({ userId: createdUser.id })

			expect(user.name).toEqual('John Doe')
		})
		
		it('should not return users profile with wrong id', async () => {
      
			expect(() =>
				getUserProfileService.execute({ userId: 'n0n3X1stentID' })
			).rejects.toBeInstanceOf(ResourceNotFoundError)
		})
	})
})