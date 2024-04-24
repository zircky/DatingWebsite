import { CreateAuthLoginInput } from './create-auth.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthLoginInput) {
	@Field(() => Int)
	id: number
}
