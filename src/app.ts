import fastify from 'fastify'

import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

const userSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(6)
})

app.post('/users', async (req, res) => {
	const { name, email, password } = userSchema.parse(req.body)

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash: password
		}
	})

	return res.status(201).send()
})
