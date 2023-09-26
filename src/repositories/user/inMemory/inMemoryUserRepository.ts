import { Prisma, User } from '@prisma/client'
import { IUserRepository } from '../userRepository'

export class InMemoryUserRepository implements IUserRepository {

	public users: User[] = []

	async findById(id: string) {
		const user = this.users.find(user => user.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		if (!user) {
			return null
		}

		return user
	}

	async create(data: Prisma.UserCreateInput) {
		const user = {
			id: '1',
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			createdAt: new Date()
		}

		this.users.push(user)
    
		return user
	}
}