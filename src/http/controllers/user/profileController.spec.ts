import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Profile Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should get users profile', async () => {
		await request(app.server).post('/users').send({
			name: 'User',
			email: 'userTest@gmail.com',
			password: '123456'
		})

		const authResponse = await request(app.server).post('/auth').send({
			email: 'userTest@gmail.com',
			password: '123456'
		})

		const { token } = authResponse.body

		const response = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.user).toEqual(
			expect.objectContaining({
				email: 'userTest@gmail.com'
			})
		)
	})
})