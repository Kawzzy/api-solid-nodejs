import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/user/checkInRepository'

interface ICheckInRequest {
  userId: string,
  gymId: string
}

interface ICheckInResponse {
  checkIn: CheckIn
}

export class CheckInService {

	constructor(private checkInRepository: CheckInRepository) {}

	async execute({ userId, gymId } : ICheckInRequest) : Promise<ICheckInResponse> {
		const checkInOnSameDay = await this.checkInRepository.findUserByIdOnDate(userId, new Date())
		
		if (checkInOnSameDay) {
			throw new Error
		}
		
		const checkIn = await this.checkInRepository.create({userId, gymId})

		return { checkIn }
	}
}