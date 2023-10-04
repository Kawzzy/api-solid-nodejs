import { SearchGymService } from './searchGymService'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from '@/repositories/gym/inMemory/inMemoryGymRepository'

let inMemoryGymInRepository: InMemoryGymRepository
let searchGymService: SearchGymService

describe('Services', () => {
	describe('Search gym service', () => {

		beforeEach(async () => {
			inMemoryGymInRepository = new InMemoryGymRepository()
			searchGymService = new SearchGymService(inMemoryGymInRepository)
		})

		it('should search for gyms', async () => {
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
				latitude: 49.2342,
				longitude: 75.6744
			})

			const { gyms } = await searchGymService.execute({
				query: 'Gymgobel',
				page: 1
			})

			expect(gyms).toHaveLength(1)
			expect(gyms).toEqual([
				expect.objectContaining({ name: 'Gymgobel'})
			])
		})

		it('should fetch paginated gyms on search', async () => {
			for (let i = 1; i <= 22; i++) {
				await inMemoryGymInRepository.create({
					name: `Gymgobel-${i}`,
					description: '',
					phone: '',
					latitude: 49.2342,
					longitude: 75.6744
				})
			}

			const { gyms } = await searchGymService.execute({
				query: 'Gymgobel',
				page: 2
			})

			expect(gyms).toHaveLength(2)
			expect(gyms).toEqual([
				expect.objectContaining({ name: 'Gymgobel-21'}),
				expect.objectContaining({ name: 'Gymgobel-22'})
			])
		})
	})
})