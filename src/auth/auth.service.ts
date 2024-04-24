import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'
import { CreateAuthLoginInput, CreateAuthRegisterInput } from './dto/create-auth.input'
import { verify } from 'argon2'
import { Response } from 'express'
import { Role } from '@prisma/client'

@Injectable()
export class AuthService {
	EXPIRE_DAY_REFRESH_TOKEN = 1
	REFRESH_TOKEN_NAME = 'refreshToken'

	constructor(
		private jwt: JwtService,
		private userService: UserService
	) {
	}

	async login(dto: CreateAuthLoginInput) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.validateUser(dto)
		const tokens = await this.issueTokens(user.id, user.role)

		return {
			user,
			...tokens
		}
	}

	async register(dto: CreateAuthRegisterInput) {
		const oldUser = await this.userService.getByEmail(dto.email)

		if (oldUser) throw new BadRequestException('User already exists')

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = await this.userService.create(dto)

		const tokens = await this.issueTokens(user.id, user.role)

		return {
			user,
			...tokens
		}
	}

	private async issueTokens(userId: number, role?: Role) {
		const data = { id: userId, role }

		const accessToken = this.jwt.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async validateUser(dto: CreateAuthLoginInput) {
		const user = await this.userService.getByEmail(dto.email)

		if (!user) throw new UnauthorizedException('Email or password invalid')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new UnauthorizedException('Email or password invalid')

		return user
	}

	addRefreshTokenToResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date()
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN)

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			// true if production
			secure: true,
			// lax if production
			sameSite: 'none'
		})
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			expires: new Date(0),
			// true if production
			secure: true,
			// lax if production
			sameSite: 'none'
		})
	}
}
