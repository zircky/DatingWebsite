import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphqlModule } from './graphql/graphql.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [ConfigModule.forRoot(), GraphqlModule, AuthModule, UserModule],
	controllers: [],
	providers: []
})
export class AppModule {
}
