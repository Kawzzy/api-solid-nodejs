import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInHistoryService } from './fetchUserCheckInHistoryService'
import { InMemoryCheckInRepository } from '@/repositories/user/inMemory/inMemoryCheckInRepository'

let inMemoryCheckInRepository: InMemoryCheckInRepository
let fetchUserCheckInHistoryService: FetchUserCheckInHistoryService

describe('Services', () => {
	describe('Fetch user check-ins history service', () => {

		beforeEach(async () => {
			inMemoryCheckInRepository = new InMemoryCheckInRepository()
			fetchUserCheckInHistoryService = new FetchUserCheckInHistoryService(inMemoryCheckInRepository)
		})

		it('should fetch check-ins history', async () => {
			await inMemoryCheckInRepository.create({
				gymId: 'gym-01',
				userId: 'user-01'
			})

			await inMemoryCheckInRepository.create({
				gymId: 'gym-02',
				userId: 'user-01'
			})

			const { checkIns } = await fetchUserCheckInHistoryService.execute({
				userId: 'user-01',
				page: 1
			})

			expect(checkIns).toHaveLength(2)
			expect(checkIns).toEqual([
				expect.objectContaining({ gymId: 'gym-01'}),
				expect.objectContaining({ gymId: 'gym-02'})
			])
		})

		it('should fetch paginated check-ins history', async () => {
			for (let i = 1; i <= 22; i++) {
				await inMemoryCheckInRepository.create({
					gymId: `gym-${i}`,
					userId: 'user-01'
				})
			}

			const { checkIns } = await fetchUserCheckInHistoryService.execute({
				userId: 'user-01',
				page: 2
			})

			expect(checkIns).toHaveLength(2)
			expect(checkIns).toEqual([
				expect.objectContaining({ gymId: 'gym-21'}),
				expect.objectContaining({ gymId: 'gym-22'})
			])
		})
	})
})