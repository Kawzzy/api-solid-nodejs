import dayjs from 'dayjs'

import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { ICheckInRepository } from '../checkInRepository'

export class InMemoryCheckInRepository implements ICheckInRepository {

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

	async save(checkIn: CheckIn) {
		const checkInIndex = this.checkIns.findIndex(checkin => checkin.id === checkIn.id)

		if (checkInIndex >= 0) {
			this.checkIns[checkInIndex] = checkIn
		}

		return checkIn
	}

	async countByUserId(userId: string) {
		return this.checkIns.filter(checkIn => checkIn.userId === userId).length
	}

	async findUserByIdOnDate(userId: string, date: Date) {
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

	async findManyByUserId(userId: string, page: number) {
		return this.checkIns
			.filter(checkIn => checkIn.userId === userId)
			.slice((page - 1) * 20, page * 20)
	}

	async findById(checkInId: string) {
		const checkIn = this.checkIns.find(checkIn => checkIn.id === checkInId)

		if (!checkIn) {
			return null
		}

		return checkIn
	}
}