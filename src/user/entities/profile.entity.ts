import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Profile {
	@Field(() => Int)
	id: number

	@Field(() => GraphQLISODateTime)
	createdAt: Date

	@Field(() => GraphQLISODateTime)
	updatedAt: Date

	@Field(() => Int)
	height: number

	@Field(() => Int)
	weight: number

	@Field(() => String)
	hairColor: string

	@Field(() => String)
	eyeColor: string

	@Field(() => String)
	purposeOfDating: string

	@Field(() => String)
	aboutMe: string

}