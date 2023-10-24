import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('Fetch nearby gym Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should list nearby gyms', async () => {

		const { token } = await createAndAuthenticateUser(app)

		await request(app.server)
			.post('/gyms/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'GymGobel',
				description: 'Jingle all the way',
				phone: '1140028922',
				latitude: 49.2342,
				longitude: 75.6744
			})
    
		await request(app.server)
			.post('/gyms/create')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'MaGymBoo',
				description: 'You are weak',
				phone: '1145438922',
				latitude: 50.3000,
				longitude: 80.7000
			})

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: 49.2341,
				longitude: 75.6744
			})
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.gyms).toHaveLength(1)
		expect(response.body.gyms).toEqual([
			expect.objectContaining({
				name: 'GymGobel'
			})
		])
	})
})