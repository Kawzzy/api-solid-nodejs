import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'

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

		checkIn.validatedAt = new Date()

		await this.checkInRepository.save(checkIn)
    
		return { checkIn }
	}
}