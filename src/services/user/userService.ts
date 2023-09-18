import { hash } from 'bcryptjs'

interface IUser {
  name: string
  email: string
  password: string
}

export class UserService {
	
	constructor(private userRepository: any) {}
	
	async createUser({name, email, password}: IUser) {

		const user = await this.userRepository.verifyEmail(email)
	
		if (user) {
			throw new Error(`Email ${email} is already in use!`)
		}
	
		const passwordHash = await hash(password, 6)
	
		await this.userRepository.create({name, email, passwordHash})
	}
}