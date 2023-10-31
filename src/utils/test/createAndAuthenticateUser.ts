import request from 'supertest'

import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance, isAdmin = false) {
	await prisma.user.create({
		data: {
			name: 'User',
			email: 'userTest@gmail.com',
			passwordHash: await hash('123456', 6),
			role: isAdmin ? 'ADMIN' : 'MEMBER'
		}
	})

	const authResponse = await request(app.server).post('/auth').send({
		email: 'userTest@gmail.com',
		password: '123456'
	})

	const { token } = authResponse.body

	return { token }
}