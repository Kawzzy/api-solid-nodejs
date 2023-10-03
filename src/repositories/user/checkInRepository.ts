import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckInRepository {

  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>

  findUserByIdOnDate(userId: string, date: Date): Promise<CheckIn | null>

  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
}