import { CheckIn } from '@prisma/client'
import { MaxDistanceError } from './errors/maxDistanceError'
import { IGymRepository } from '@/repositories/gym/gymRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { getDistanceBetweenCoordinates } from '@/utils/user/checkInUtils'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'
import { MaxNumberOfCheckInsError } from './errors/maxNumberOfCheckInsError'

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

	async execute({ userId, gymId, userLatitude, userLongitude } : ICheckInRequest) : Promise<ICheckInResponse> {
		const gym = await this.gymRepository.findById(gymId)

		if (!gym) {
			throw new ResourceNotFoundError()
		}

		const distance = getDistanceBetweenCoordinates(
			{ latitude: userLatitude, longitude: userLongitude },
			{ latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
		)
		
		const MAX_DISTANCE_IN_KM = 0.1

		if (distance > MAX_DISTANCE_IN_KM) {
			throw new MaxDistanceError()
		}

		const checkInOnSameDay = await this.checkInRepository.findUserByIdOnDate(userId, new Date())
		
		if (checkInOnSameDay) {
			throw new MaxNumberOfCheckInsError()
		}
		
		const checkIn = await this.checkInRepository.create({userId, gymId})

		return { checkIn }
	}
}