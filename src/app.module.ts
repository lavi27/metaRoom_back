import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true
    // }),
    UserModule,
    SocketModule,
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "lavi",
      "password": "qwerty2007@",
      "database": "metaRoom",
      "entities": []
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
