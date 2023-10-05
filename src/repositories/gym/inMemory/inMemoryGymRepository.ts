import { randomUUID } from 'node:crypto'
import { Gym, Prisma } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'
import { IFindManyNearbyParams, IGymRepository } from '../gymRepository'
import { getDistanceBetweenCoordinates } from '@/utils/user/checkInUtils'

export class InMemoryGymRepository implements IGymRepository {

	public gyms: Gym[] = []

	async findById(id: string) {
		const gym = this.gyms.find(gym => gym.id === id)

		if (!gym) {
			return null
		}

		return gym
	}

	async findManyNearby(params: IFindManyNearbyParams) {
		return this.gyms.filter(gym => {
			const distance = getDistanceBetweenCoordinates(
				{ latitude: params.latitude, longitude: params.longitude },
				{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
			)

			return distance < 10 // 10km
		})
	}

	async searchMany(query: string, page: number) {
		return this.gyms
			.filter(gym => gym.name.includes(query))
			.slice((page - 1) * 20, page * 20)
	}

	async create(data: Prisma.GymCreateInput) {
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