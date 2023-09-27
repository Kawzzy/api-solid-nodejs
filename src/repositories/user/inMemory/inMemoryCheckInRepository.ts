import { randomUUID } from 'node:crypto'
import { CheckIn, Prisma } from '@prisma/client'
import { CheckInRepository } from '../prisma/checkInRepository'

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
}