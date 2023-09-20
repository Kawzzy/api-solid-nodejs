import { hash } from 'bcryptjs'
import { User } from '@prisma/client'
import { IUserRepository } from '@/repositories/user/userRepository'
import { UserAlreadyExistsError } from './errors/userAlreadyExistsError'

interface IUserServiceRequest {
  name: string
  email: string
  password: string
}

interface IUserServiceResponse {
	user: User
}

export class UserService {
	
	constructor(private userRepository: IUserRepository) {}
	
	async createUser({name, email, password}: IUserServiceRequest): Promise<IUserServiceResponse> {

		const userFiltered = await this.userRepository.findByEmail(email)
	
		if (userFiltered) {
			throw new UserAlreadyExistsError()
		}
	
		const passwordHash = await hash(password, 6)
	
		const user = await this.userRepository.create({name, email, passwordHash})

		return {
			user
		}
	}
}