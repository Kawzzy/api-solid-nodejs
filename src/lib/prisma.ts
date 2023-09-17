import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

// instantiates the connection with the database
export const prisma = new PrismaClient({
	log: env.NODE_ENV === 'dev' ? ['query'] : []
})