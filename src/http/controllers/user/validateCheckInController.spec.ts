import request from 'supertest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/createAndAuthenticateUser'

describe('Validate CheckIn Controller (e2e)', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should validate a checkIn', async () => {

		const { token } = await createAndAuthenticateUser(app)

		const user = await prisma.user.findFirstOrThrow()
    
		const gym = await prisma.gym.create({
			data: {
				name: 'GymGobel',
				latitude: 49.2341,
				longitude: 75.6744
			}
		})

		let checkIn = await prisma.checkIn.create({
			data: {
				gymId: gym.id,
				userId: user.id
			}
		})

		const response = await request(app.server)
			.patch(`/checkIns/${checkIn.id}/validate`)
			.set('Authorization', `Bearer ${token}`)
			.send()

		expect(response.statusCode).toEqual(204)

		checkIn = await prisma.checkIn.findUniqueOrThrow({
			where: {
				id: checkIn.id
			}
		})

		expect(checkIn.validatedAt).toEqual(expect.any(Date))
	})
})