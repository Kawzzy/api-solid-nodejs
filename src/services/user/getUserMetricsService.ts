import { ICheckInRepository } from '@/repositories/user/checkInRepository'

interface IGetUserMetricsRequest {
  userId: string
}

interface IGetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsService {

	constructor(
		private checkInRepository: ICheckInRepository,
	) {}

	async execute({ userId } : IGetUserMetricsRequest) : Promise<IGetUserMetricsResponse> {
		const checkInsCount = await this.checkInRepository.countByUserId(userId)

		return { checkInsCount }
	}
}