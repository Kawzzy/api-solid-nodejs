import { compare } from 'bcryptjs'
import { User } from '@prisma/client'
import { IUserRepository } from '@/repositories/user/userRepository'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'

interface IAuthenticateRequest {
  email: string,
  password: string
}

interface IAuthenticateResponse {
  user: User
}

export class AuthenticationService {

	constructor(private userRepository: IUserRepository) {}

	async execute({ email, password } : IAuthenticateRequest) : Promise<IAuthenticateResponse> {
		const user = await this.userRepository.findByEmail(email)
    
		if (!user) {
			throw new InvalidCredentialsError()
		}
    
		const doesPasswordMatch = compare(password, user.passwordHash)
    
		if (!doesPasswordMatch) {
			throw new InvalidCredentialsError()
		}

		return { user }
	}
}