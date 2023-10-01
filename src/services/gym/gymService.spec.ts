import { GymService } from './gymService'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/gym/inMemory/inMemoryGymRepository'

let inMemoryGymRepository: InMemoryGymRepository
let gymService: GymService

describe('Services', () => {
	describe('Gym service', () => {

		beforeEach(() => {
			inMemoryGymRepository = new InMemoryGymRepository()
			gymService = new GymService(inMemoryGymRepository)
		})

		it('should complete registration successfully', async () => {

			const { gym } = await gymService.createGym({
				name: 'Gymgobel',
				description: null,
				phone: null,
				latitude: 12,
				longitude: 10
			})

			expect(gym.id).toEqual(expect.any(String))
		})
	})
})