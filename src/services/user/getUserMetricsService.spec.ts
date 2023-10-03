import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsService } from './getUserMetricsService'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let getUserMetricsService: GetUserMetricsService

describe('Services', () => {
	describe('Get user metrics service', () => {

		beforeEach(async () => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			getUserMetricsService = new GetUserMetricsService(inMemoryCheckInRepository)
		})

		it('should get check-ins count from metrics', async () => {
			await inMemoryCheckInRepository.create({
				gymId: 'gym-01',
				userId: 'user-01'
			})

			await inMemoryCheckInRepository.create({
				gymId: 'gym-02',
				userId: 'user-01'
			})

			const { checkInsCount } = await getUserMetricsService.execute({
				userId: 'user-01'
			})

			expect(checkInsCount).toEqual(2)
		})
	})
})