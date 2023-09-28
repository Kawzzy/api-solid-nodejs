import { CheckIn } from '@prisma/client'
import { IGymRepository } from '@/repositories/gym/gymRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'

interface ICheckInRequest {
  userId: string,
  gymId: string,
	userLatitude: number,
	userLongitude: number
}

interface ICheckInResponse {
  checkIn: CheckIn
}

export class CheckInService {

	constructor(
		private checkInRepository: ICheckInRepository,
		private gymRepository: IGymRepository
	) {}

	async execute({ userId, gymId } : ICheckInRequest) : Promise<ICheckInResponse> {
		const gym = await this.gymRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		// calculate the distance
		
		const checkInOnSameDay = await this.checkInRepository.findUserByIdOnDate(userId, new Date())
		
		if (checkInOnSameDay) {
			throw new Error
		}
		
		const checkIn = await this.checkInRepository.create({userId, gymId})

		return { checkIn }
	}
}