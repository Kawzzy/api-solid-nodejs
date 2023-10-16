import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('Gym Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should create a gym', async () => {

		const { token } = await createAndAuthenticateUser(app)

		const response = await request(app.server)
			.post('/gyms/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'GymGobel',
				description: 'Jingle all the way',
				phone: '1140028922',
				latitude: 49.2341,
				longitude: 75.6744
			})

		expect(response.statusCode).toEqual(201)
	})
})