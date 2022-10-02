import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/create-user.dto';
import JwtAuthGuard from './auth.guard';
import { AuthService } from './auth.service';
// import RequestWithUser from './reqWithUser.interface';

@Controller('auth')
export class AuthController {
    // constructor(readonly authService: AuthService) {}
    
    // // @Post('register')
    // async register(@Body() user: createUserDto) {
    //   return this.authService.register(registrationData);
    // }
    
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Post('login')
    async logIn(@Req() req) {
    //   const user = req.user;
    //   user.password = undefined;
      
      return req.user;
    }
}
