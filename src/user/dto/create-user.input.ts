import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {

	@Field(() => String)
	@IsString()
	email: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	password?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	name?: string

	@Field(() => String)
	@IsOptional()
	@IsString()
	slug: string

	@Field(() => Date)
	@IsOptional()
	@IsDate()
	dateOfBirth: Date

	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	imagesId: number

	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	profileId: number
}
