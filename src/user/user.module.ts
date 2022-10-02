import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entity/user.entity';
import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './user.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule
    ],
    controllers: [
        UserController,
        // LocalStrategy
    ],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}
