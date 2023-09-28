import { Gym } from '@prisma/client'
import { IGymRepository } from '../gymRepository'

export class InMemoryGymRepository implements IGymRepository {

	public gyms: Gym[] = []

	async findById(id: string) {
		const gym = this.gyms.find(gym => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}
}