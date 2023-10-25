import request from 'supertest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('Get users metrics (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should get users metrics', async () => {

		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()
    
		const gym = await prisma.gym.create({
			data: {
				name: 'GymGobel',
				latitude: 49.2341,
				longitude: 75.6744
			}
		})

		const { checkIns } = await prisma.checkIn.createMany({
			data: [
				{
					gymId: gym.id,
					userId: user.id
				},
				{
					gymId: gym.id,
					userId: user.id
				}
			]
		})

		const response = await request(app.server)
			.get('/checkIns/metrics')
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(200)
		expect(response.body.checkInsCount).toEqual(2)
	})
})