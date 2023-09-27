import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/user/prisma/checkInRepository'

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
		const checkIn = await this.checkInRepository.create({userId, gymId})

		return { checkIn }
	}
}