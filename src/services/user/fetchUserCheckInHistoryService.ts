import { CheckIn } from '@prisma/client'
import { ICheckInRepository } from '@/repositories/user/checkInRepository'

interface IFetchUserCheckInHistoryRequest {
  userId: string,
	page: number
}

interface IFetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryService {

	constructor(
		private checkInRepository: ICheckInRepository,
	) {}

	async execute({ userId, page } : IFetchUserCheckInHistoryRequest) : Promise<IFetchUserCheckInHistoryResponse> {
		const checkIns = await this.checkInRepository.findManyByUserId(userId, page)

		return { checkIns }
	}
}