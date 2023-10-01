import { CheckInService } from './checkInService'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/maxDistanceError'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'
import { InMemoryGymRepository } from '@/repositories/gym/inMemory/inMemoryGymRepository'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let inMemoryGymRepository: InMemoryGymRepository
let checkInService: CheckInService

describe('Services', () => {
	describe('CheckIn service', () => {

		beforeEach(async () => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			inMemoryGymRepository = new InMemoryGymRepository()
			checkInService = new CheckInService(inMemoryCheckInRepository, inMemoryGymRepository)

			await inMemoryGymRepository.create({
				id: 'gym-01',
				name: 'Gymgobel',
				description: '',
				phone: '',
				latitude: 49.2342,
				longitude: 75.6744
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
				userLatitude: 49.2341,
				userLongitude: 75.6744
			})

			expect(checkIn.id).toEqual(expect.any(String))
		})

		it('should not check in twice a day', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))

			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 49.2341,
				userLongitude: 75.6744
			})

			await expect(() =>
				checkInService.execute({
					userId: 'user-01',
					gymId: 'gym-01',
					userLatitude: 49.2341,
					userLongitude: 75.6744
				})
			).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
		})

		it('should check in different days', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))
      
			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 49.2341,
				userLongitude: 75.6744
			})

			vi.setSystemTime(new Date(2023, 8, 26, 10, 0, 0))

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01',
				userLatitude: 49.2341,
				userLongitude: 75.6744
			})

			expect(checkIn.id).toEqual(expect.any(String))
		})
		
		it('should not check in on distant gym', async () => {

			inMemoryGymRepository.gyms.push({
				id: 'gym-02',
				name: 'Gymgobel-filial',
				description: '',
				phone: '',
				latitude: new Decimal(49.2342),
				longitude: new Decimal(75.6744)
			})

			await expect(() => 
				checkInService.execute({
					userId: 'user-01',
					gymId: 'gym-02',
					userLatitude: 49.3342,
					userLongitude: 75.6744
				})
			).rejects.toBeInstanceOf(MaxDistanceError)
		})
	})
})