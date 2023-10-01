import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { IGymRepository } from '../gymRepository'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymRepository implements IGymRepository {

	public gyms: Gym[] = []

	async findById(id: string) {
		const gym = this.gyms.find(gym => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const {id, name, description, phone, latitude, longitude} = data

		const gym = {
			id: id ?? randomUUID(),
			name,
			description: description ?? null,
			phone: phone ?? null,
			latitude: new Decimal(latitude.toString()),
			longitude: new Decimal(longitude.toString()),
			createdAt: new Date()
		}

		this.gyms.push(gym)

		return gym
	}
}