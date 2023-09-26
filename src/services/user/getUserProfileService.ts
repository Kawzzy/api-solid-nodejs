import { User } from '@prisma/client'
import { IUserRepository } from '@/repositories/user/userRepository'
import { ResourceNotFoundError } from './errors/resourceNotFoundError'

interface IGetUserProfileRequest {
  userId: string
}

interface IGetUserProfileResponse {
  user: User
}

export class GetUserProfileService {

	constructor(private userRepository: IUserRepository) {}

	async execute({ userId } : IGetUserProfileRequest) : Promise<IGetUserProfileResponse> {
		const user = await this.userRepository.findById(userId)
    
		if (!user) {
			throw new ResourceNotFoundError()
		}

		return { user }
	}
}