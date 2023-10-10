import { ValidateCheckInService } from './validateCheckInService'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LateCheckInValidationError } from './errors/lateCheckInValidationError'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let validateCheckInService: ValidateCheckInService

describe('Services', () => {
	describe('Validate CheckIn service', () => {

		beforeEach(async () => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			validateCheckInService = new ValidateCheckInService(inMemoryCheckInRepository)

			vi.useFakeTimers()
		})

		afterEach(() => {
			vi.useRealTimers()
		})

		it('should validate the check-in', async () => {

			const createdCheckIn = await inMemoryCheckInRepository.create({
				gymId: 'gym-01',
				userId: 'user-01'
			})

			const { checkIn } = await validateCheckInService.execute({
				checkInId: createdCheckIn.id
			})

			expect(checkIn.validatedAt).toEqual(expect.any(Date))
			expect(inMemoryCheckInRepository.checkIns[0].validatedAt).toEqual(expect.any(Date))
		})

		it('should not validate an inexistent check-in', async () => {

			await expect(() => 
				validateCheckInService.execute({
					checkInId: 'inexistent-id'
				})
			).rejects.toBeInstanceOf(ResourceNotFoundError)
		})

		it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
			vi.setSystemTime(new Date(2023, 3, 24, 10, 35))

			const createdCheckIn = await inMemoryCheckInRepository.create({
				gymId: 'gym-01',
				userId: 'user-01'
			})

			vi.advanceTimersByTime(1000 * 60 * 30) // 21 minutes in ms

			await expect(() =>
				validateCheckInService.execute({
					checkInId: createdCheckIn.id
				})
			).rejects.toBeInstanceOf(LateCheckInValidationError)
		})
	})
})