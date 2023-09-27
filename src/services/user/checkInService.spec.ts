import { CheckInService } from './checkInService'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let checkInService: CheckInService

describe('Services', () => {
	describe('CheckIn service', () => {

		beforeEach(() => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			checkInService = new CheckInService(inMemoryCheckInRepository)

			vi.useFakeTimers()
		})

		afterEach(() => {
			vi.useRealTimers()
		})

		it('should check in', async () => {

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01'
			})


			expect(checkIn.id).toEqual(expect.any(String))
		})

		it('should not check in twice a day', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))

			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01'
			})

			await expect(() =>
				checkInService.execute({
					userId: 'user-01',
					gymId: 'gym-01'
				})
			).rejects.toBeInstanceOf(Error)
		})

		it('should check in different days', async () => {
			vi.setSystemTime(new Date(2023, 8, 25, 10, 0, 0))
      
			await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01'
			})

			vi.setSystemTime(new Date(2023, 8, 26, 10, 0, 0))

			const { checkIn } = await checkInService.execute({
				userId: 'user-01',
				gymId: 'gym-01'
			})

			expect(checkIn.id).toEqual(expect.any(String))
		})
	})
})