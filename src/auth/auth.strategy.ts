import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(
      //{ usernameField: 'name',}
    );
  }
  
  async validate(user: loginUserDto): Promise<any> {
    const userInfo = await this.authService.validateUser(user);
    
    if (!userInfo) {
      throw new UnauthorizedException();
    }
    
    return userInfo;
  }
}