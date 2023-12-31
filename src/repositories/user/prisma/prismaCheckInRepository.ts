import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'
import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../checkInRepository'

export class PrismaCheckInRepository implements ICheckInRepository {
	
	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = await prisma.checkIn.create({
			data
		})

		return checkIn
	}
	
	async save(data: CheckIn) {
		const checkIn = await prisma.checkIn.update({
			where: {
				id: data.id
			},
			data
		})

		return checkIn
	}
	
	async countByUserId(userId: string) {
		const count = await prisma.checkIn.count({
			where: {
				userId
			}
		})

		return count
	}

	async findByUserIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')
    
		const checkIn = await prisma.checkIn.findFirst({
			where: {
				userId,
				createdAt: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate()
				}
			}
		})

		return checkIn
	}
	
	async findManyByUserId(userId: string, page: number) {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				userId
			},
			take: 20, // 20 results
			skip: (page - 1) * 20 // starts from the "first" result of the page, ie. page 3 starts from the 40th result
		})

		return checkIns
	}
	
	async findById(id: string) {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id
			}
		})

		return checkIn
	}
}