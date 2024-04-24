import { Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { Auth } from './entities/auth.entity'
import { UserService } from '../user/user.service'
import { HttpCode, UsePipes, ValidationPipe } from '@nestjs/common'

@Resolver(() => Auth)
export class AuthResolver {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService
	) {
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Mutation('login')
	async login() {

	}

}
