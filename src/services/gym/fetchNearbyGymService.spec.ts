import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymService } from './fetchNearbyGymService'
import { InMemoryGymRepository } from '@/repositories/gym/inMemory/inMemoryGymRepository'

let inMemoryGymInRepository: InMemoryGymRepository
let fetchNearbyGymService: FetchNearbyGymService

describe('Services', () => {
	describe('Fetch nearby gym service', () => {

		beforeEach(async () => {
			inMemoryGymInRepository = new InMemoryGymRepository()
			fetchNearbyGymService = new FetchNearbyGymService(inMemoryGymInRepository)
		})

		it('should fetch nearby gyms', async () => {
			await inMemoryGymInRepository.create({
				name: 'Gymgobel',
				description: '',
				phone: '',
				latitude: 49.2342,
				longitude: 75.6744
			})

			await inMemoryGymInRepository.create({
				name: 'LA Fitness',
				description: '',
				phone: '',
				latitude: 50.3000,
				longitude: 80.7000
			})

			const { gyms } = await fetchNearbyGymService.execute({
				userLatitude: 49.2341,
				userLongitude: 75.6744
			})

			expect(gyms).toHaveLength(1)
			expect(gyms).toEqual([
				expect.objectContaining({ name: 'Gymgobel'})
			])
		})
	})
})