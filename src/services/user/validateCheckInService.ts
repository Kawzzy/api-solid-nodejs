import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'
import { LateCheckInValidationError } from './errors/lateCheckInValidationError'

interface IValidateCheckInRequest {
  checkInId: string
}

interface IValidateCheckInResponse {
  checkIn: CheckIn  
}

export class ValidateCheckInService {

	constructor(private checkInRepository: ICheckInRepository) {}

	async execute({ checkInId } : IValidateCheckInRequest) : Promise<IValidateCheckInResponse> {
		const checkIn = await this.checkInRepository.findById(checkInId)

		if (!checkIn) {
			throw new ResourceNotFoundError()
		}

		const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
			checkIn.createdAt,
			'minutes' 
		)

		if (distanceInMinutesFromCheckInCreation > 20) {
			throw new LateCheckInValidationError()
		}

		checkIn.validatedAt = new Date()

		await this.checkInRepository.save(checkIn)
    
		return { checkIn }
	}
}