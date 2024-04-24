import { Field, InputType, Int } from '@nestjs/graphql'
import { IsDate, IsEmail, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateAuthLoginInput {
	@Field(() => String)
	@IsEmail()
	email: string

	@Field(() => String)
	@MinLength(6, {
		message: 'Password must be at least 6 characters long'
	})
	@IsString()
	password: string

}

export class CreateAuthRegisterInput extends CreateAuthLoginInput {
	@Field(() => Date)
	@IsDate()
	dateOfBirth: Date

	@Field(() => String)
	@IsString()
	name: string


	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	profileId: number

	@Field(() => Int)
	@IsOptional()
	@IsNumber()
	imagesId: number

	@Field(() => String)
	@IsOptional()
	@IsString()
	slug: string
}
