import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { PostgresErrorCode } from 'src/configs/postgresErrorCodes.enum';
import { getUserDto } from 'src/user/dto/get-user.dto';
import { loginUserDto } from 'src/user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(user: loginUserDto): Promise<any> {
    const userInfo = await this.userService.findOne(user.name);

    if (userInfo.pw === user.pw) {
      const { pw, ...result } = user;
      return result;
    }

    return null;


    // const hashedPassword = await bcrypt.hash(user.pw, 3);
    // try {
    //   const createdUser = await this.userService.create({
    //     ...user,
    //     pw: hashedPassword,
    //   });
    //   createdUser.pw = undefined;
      
    //   return createdUser;
    // } catch (error) {
    //   if (error?.code === PostgresErrorCode.UniqueViolation) {
    //     throw new HttpException(
    //       '사용자 이메일은 이미 존재합니다.',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }
    //   throw new HttpException(
    //     '알 수 없는 오류가 발생했습니다.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  // public async getAuthenticatedUser(user: createUserDto) {
  //   try {
  //     const userinfo = this.userService.findOneBy({ name: user.name });

  //     await this.verifyPassword(plainTextPassword, userinfo.pw);
  //     userinfo.pw = undefined;
  //     return user;
  //   } catch (error) {
  //     throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
  //   }
  // }
  
  // private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
  //   const isPasswordMatching = await bcrypt.compare(
  //     plainTextPassword,
  //     hashedPassword
  //   );
  //   if (!isPasswordMatching) {
  //     throw new HttpException('잘못된 인증 정보입니다.', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // public async getAuthenticatedUser(user: createUserDto) {
  //   try {
  //     const user = await this.userService.getByEmail(email);
  //     const isPasswordMatching = await bcrypt.compare(
  //       hashedPassword,
  //       user.password,
  //     );
  //     if (!isPasswordMatching) {
  //       throw new HttpException(
  //         '잘못된 인증 정보입니다.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     user.password = undefined;

  //     return user;
  //   } catch (error) {
  //     throw new HttpException(
  //       '잘못된 인증 정보입니다.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  // }
}
