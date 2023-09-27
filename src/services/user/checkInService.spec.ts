import { CheckInService } from './checkInService'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let checkInService: CheckInService

describe('Services', () => {
	describe('CheckIn service', () => {

		beforeEach(() => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			checkInService = new CheckInService(inMemoryCheckInRepository)
		})

		it('should check in', async () => {

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01'
			})


			expect(checkIn.id).toEqual(expect.any(String))
		})
	})
})