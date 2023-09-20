import { compare } from 'bcryptjs'
import { UserService } from './userService'
import { describe, expect, it } from 'vitest'

describe('Services', () => {
	describe('User service', () => {
		it('should hash the users password on registration', async () => {
			const userService = new UserService({
				async findByEmail(email) {
					null
				},

				async create(data) {
					return {
						id: '1',
						name: data.name,
						email: data.email,
						passwordHash: data.passwordHash,
						createdAt: new Date()
					}
				},
			})

			const password = '123456'

			const { user } = await userService.createUser({
				name: 'John Doe',
				email: 'johndoe@test.com',
				password
			})

			const isSameHash = await compare(password, user.passwordHash)

			expect(isSameHash).toBe(true)
		})
	})
})