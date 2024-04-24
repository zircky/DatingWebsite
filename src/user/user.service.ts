import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { returnUserObject } from './return-user.object'
import { CreateUserInput } from './dto/create-user.input'
import { hash } from 'argon2'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {
	}

	async getUsers() {
		return this.prisma.user.findMany({
			select: returnUserObject
		})
	}

	async getById(id: number) {
		return this.prisma.user.findUnique({
			where: {
				id
			}
		})
	}

	async getByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: {
				email
			}
		})
	}

	async create(dto: CreateUserInput) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const users = await this.getUsers()

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const user = {
			id: users.length + 1,
			email: dto.email,
			name: dto.name,
			slug: dto.slug,
			dateOfBirth: dto.dateOfBirth,
			password: await hash(dto.password)
		}

		return this.prisma.user.create({
			data: user
		})
	}
}
