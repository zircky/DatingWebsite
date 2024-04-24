import { Prisma } from '@prisma/client'
import { returnImagesObject } from './return-images.object'
import { returnProfileObject } from './return-profile.object'

export const returnUserObject: Prisma.UserSelect = {
	id: true,
	name: true,
	email: true,
	password: false,
	slug: true,
	dateOfBirth: true,
	images: { select: returnImagesObject },
	profile: { select: returnProfileObject }
}