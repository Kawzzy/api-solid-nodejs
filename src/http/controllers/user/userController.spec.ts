import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('User Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should create user', async () => {
		const response = await request(app.server).post('/users').send({
			name: 'User',
			email: 'userTest@gmail.com',
			password: '123456'
		})

		expect(response.statusCode).toEqual(201)
	})
})