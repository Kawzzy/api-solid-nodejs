import { CheckInService } from './checkInService'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/gym/inMemory/inMemoryGymRepository'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let checkInService: CheckInService

describe('Services', () => {
	describe('CheckIn service', () => {

		beforeEach(() => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			inMemoryGymRepository = new InMemoryGymRepository()
			checkInService = new CheckInService(inMemoryCheckInRepository, inMemoryGymRepository)

			inMemoryGymRepository.gyms.push({
				id: 'gym-01',
				name: 'Gymgobel',
				description: '',
				phone: '',
				latitude: new Decimal(0),
				longitude: new Decimal(0)
			})

			vi.useFakeTimers()
		})

		afterEach(() => {
			vi.useRealTimers()
		})

		it('should check in', async () => {

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 0,
				userLongitude: 0
			})


			expect(checkIn.id).toEqual(expect.any(String))
		})

		it('should not check in twice a day', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))

			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 0,
				userLongitude: 0
			})

			await expect(() =>
				checkInService.execute({
					userId: 'user-01',
					gymId: 'gym-01',
					userLatitude: 0,
					userLongitude: 0
				})
			).rejects.toBeInstanceOf(Error)
		})

		it('should check in different days', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))
      
			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 0,
				userLongitude: 0
			})

			vi.setSystemTime(new Date(2023, 8, 26, 10, 0, 0))

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 0,
				userLongitude: 0
			})

			expect(checkIn.id).toEqual(expect.any(String))
		})
	})
})