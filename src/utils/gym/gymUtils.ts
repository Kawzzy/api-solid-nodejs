import { z } from 'zod'

export const gymSchema = z.object({
	name: z.string(),
	description: z.string().nullable(),
	phone: z.string().nullable(),
	latitude: z.number().refine(value => {
		return Math.abs(value) <= 90
	}),
	longitude: z.number().refine(value => {
		return Math.abs(value) <= 180
	}),
})

export const gymQueryParamsSchema = z.object({
	query: z.string(),
	page: z.coerce.number().min(1).default(1)
})