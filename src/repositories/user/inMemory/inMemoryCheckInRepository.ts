import dayjs from 'dayjs'

import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../checkInRepository'

export class InMemoryCheckInRepository implements CheckInRepository {

	public checkIns: CheckIn[] = []

	async create(data: Prisma.CheckInUncheckedCreateInput) {
		const checkIn = {
			id: randomUUID(),
			userId: data.userId,
			gymId: data.gymId,
			createdAt: new Date(),
			validatedAt: data.validatedAt ? new Date(data.validatedAt) : null
		}

		this.checkIns.push(checkIn)
    
		return checkIn
	}

	findUserByIdOnDate(userId: string, date: Date) {
		const startOfTheDay = dayjs(date).startOf('date')
		const endOfTheDay = dayjs(date).endOf('date')

		const checkInOnSameDate = this.checkIns.find(checkIn => {
			const checkInDate = dayjs(checkIn.createdAt)
			const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

			return checkIn.userId === userId && isOnSameDate
		})

		if (!checkInOnSameDate) {
			return null
		}

		return checkInOnSameDate
	}
}