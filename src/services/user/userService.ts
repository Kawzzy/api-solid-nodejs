import { hash } from 'bcryptjs'
import { IUserRepository } from '@/repositories/user/userRepository'

interface IUser {
  name: string
  email: string
  password: string
}

export class UserService {
	
	constructor(private userRepository: IUserRepository) {}
	
	async createUser({name, email, password}: IUser) {

		const user = await this.userRepository.findByEmail(email)
	
		if (user) {
			throw new Error(`Email ${email} is already in use!`)
		}
	
		const passwordHash = await hash(password, 6)
	
		await this.userRepository.create({name, email, passwordHash})
	}
}