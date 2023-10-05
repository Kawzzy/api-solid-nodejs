import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym/gymRepository'

interface IFetchNearbyGymServiceRequest {
  userLatitude: number
  userLongitude: number
}

interface IFetchNearbyGymServiceResponse {
	gyms: Gym[]
}

export class FetchNearbyGymService {
	
	constructor(private gymRepository: IGymRepository) {}
	
	async execute({userLatitude, userLongitude}: IFetchNearbyGymServiceRequest): Promise<IFetchNearbyGymServiceResponse> {

		const gyms = await this.gymRepository.findManyNearby({latitude: userLatitude, longitude: userLongitude})

		return {
			gyms
		}
	}
}