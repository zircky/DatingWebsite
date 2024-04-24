import { Prisma } from '@prisma/client'

export const returnImagesObject: Prisma.ImagesSelect = {
	id: true,
	images: true
}