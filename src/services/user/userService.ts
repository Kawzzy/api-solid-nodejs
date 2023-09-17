import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaUserRepository } from '@/repositories/user/prisma-user-repository'

interface IUser {
  name: string
  email: string
  password: string
}

export async function userService({name, email, password}: IUser) {
	const userExists = await prisma.user.findUnique({
		where: {
			email
		}
	})

	if (userExists) {
		throw new Error(`Email ${email} is already in use!`)
	}

	const passwordHash = await hash(password, 6)

	const prismaUserRepository = new PrismaUserRepository()

	await prismaUserRepository.create({name, email, passwordHash})
}