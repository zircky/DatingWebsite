import { Prisma } from '@prisma/client'

export const returnProfileObject: Prisma.ProfileSelect = {
	id: true,
	height: true,
	weight: true,
	hairColor: true,
	eyeColor: true,
	purposeOfDating: true,
	aboutMe: true
}