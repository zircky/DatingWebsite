import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'
import { Role } from '@prisma/client'

@ObjectType()
export class User {
	@Field(() => Int)
	id: number

	@Field(() => GraphQLISODateTime)
	createdAt: Date

	@Field(() => GraphQLISODateTime)
	updatedAt: Date

	@Field(() => String)
	email: string

	@Field(() => String)
	name: string

	@Field(() => String)
	password: string

	@Field(() => Date)
	dateOfBirth: Date

	@Field(() => Int)
	imagesId: number

	@Field(() => Int)
	profileId: number

	@Field(() => String)
	role: Role

}
