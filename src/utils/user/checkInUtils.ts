import { z } from 'zod'

interface Coordinate {
  latitude: number,
  longitude: number
}

export const checkInValidateParamsSchema = z.object({
	checkInId: z.string().uuid()
})

export const checkInFetchUserHistorySchema = z.object({
	page: z.coerce.number().min(1).default(1)
})

export const checkInCreateParamsSchema = z.object({
	gymId: z.string().uuid()
})

export const checkInSchema = z.object({
	latitude: z.number().refine(value => {
		return Math.abs(value) <= 90
	}),
	longitude: z.number().refine(value => {
		return Math.abs(value) <= 180
	})
})

/**
 * Return the distance in km between user and gym
 * 
 * @param from user's location
 * @param to gym's location
 * @returns the distance between the user and the gym in km
 */
export function getDistanceBetweenCoordinates(from: Coordinate, to: Coordinate) {
	if (from.latitude === to.latitude && from.longitude === to.longitude) {
		return 0
	}

	const fromRadian = (Math.PI * from.latitude) / 180
	const toRadian = (Math.PI * to.latitude) / 180

	const theta = from.longitude - to.longitude
	const radTheta = (Math.PI * theta) / 180

	let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

	if (dist > 1) {
		dist = 1
	}

	dist = Math.acos(dist)
	dist = (dist * 180) / Math.PI
	dist = dist * 60 * 1.1515
	dist = dist * 1.609344

	return dist
}