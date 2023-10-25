import request from 'supertest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('CheckIn Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should create a checkIn', async () => {

		const { token } = await createAndAuthenticateUser(app)
    
		const gym = await prisma.gym.create({
			data: {
				name: 'GymGobel',
				latitude: 49.2341,
				longitude: 75.6744
			}
		})

		const response = await request(app.server)
			.post(`/gyms/${gym.id}/checkIns`)
			.set('Authorization', `Bearer ${token}`)
			.send({
				latitude: 49.2341,
				longitude: 75.6744
			})

		expect(response.statusCode).toEqual(201)
	})
})