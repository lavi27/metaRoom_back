import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { UserModule } from './user/user.module';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // GraphQLModule.forRoot({
    //   autoSchemaFile: true
    // }),
    UserModule,
    SocketModule,
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
