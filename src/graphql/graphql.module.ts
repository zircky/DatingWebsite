import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'

@Module({
	imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
		driver: ApolloDriver,
		playground: true,
		autoSchemaFile: './src/schema.gql'
	})]
})
export class GraphqlModule {
}
