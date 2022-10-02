import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        PassportModule,
        UserModule
    ],
    providers: [
        AuthService,
        LocalStrategy
    ],
    controllers: [AuthController],
})

export class AuthModule {}
