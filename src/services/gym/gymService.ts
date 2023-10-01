import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym/gymRepository'

interface IGymServiceRequest {
  name: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface IGymServiceResponse {
	gym: Gym
}

export class GymService {
	
	constructor(private gymRepository: IGymRepository) {}
	
	async createGym({name, description, phone, latitude, longitude}: IGymServiceRequest): Promise<IGymServiceResponse> {

		const gym = await this.gymRepository.create({name, description, phone, latitude, longitude})

		return {
			gym
		}
	}
}