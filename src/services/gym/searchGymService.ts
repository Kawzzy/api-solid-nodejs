import { Gym } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym/gymRepository'

interface ISearchGymServiceRequest {
  query: string
  page: number
}

interface ISearchGymServiceResponse {
	gyms: Gym[]
}

export class SearchGymService {
	
	constructor(private gymRepository: IGymRepository) {}
	
	async execute({query, page}: ISearchGymServiceRequest): Promise<ISearchGymServiceResponse> {

		const gyms = await this.gymRepository.searchMany(query, page)

		return {
			gyms
		}
	}
}