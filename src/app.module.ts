import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true
    // }),
    UserModule,
    SocketModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
