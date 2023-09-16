import fastify from 'fastify'

import { PrismaClient } from '@prisma/client'

export const app = fastify()

// instantiates the connection with the database
const prisma = new PrismaClient()
