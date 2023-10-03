import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'

interface IFetchUserCheckInHistoryRequest {
  userId: string
}

interface IFetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {

	constructor(
		private checkInRepository: ICheckInRepository,
	) {}

	async execute({ userId } : IFetchUserCheckInHistoryRequest) : Promise<IFetchUserCheckInHistoryResponse> {
		const checkIns = await this.checkInRepository.findManyByUserId(userId)

		return { checkIns }
	}
}