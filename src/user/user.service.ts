import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './entity/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { loginUserDto } from './dto/login-user.dto';
import { getUserDto } from './dto/get-user.dto';
import { PostgresErrorCode } from '../configs/postgresErrorCodes.enum';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // async login(user:createUserDto) {
  //   // return user

  //   const userasdf = await this.usersRepository.findOne({ email });
  //   if (userasdf) {
  //     return user;
  //   }
  //   throw new HttpException (
  //     '사용자 이메일이 존재하지 않습니다.',
  //     HttpStatus.NOT_FOUND,
  //   );
  // }

  async getUser(id: getUserDto): Promise<any> {
    const found = await this.userRepository.findOneBy(id);
    
    if(!found){
        throw new NotFoundException(`Can't find Board with id ${id}`)
    }
    return found; 
  }

  // async create(user: createUserDto) {
  //   // const newUser = this.userRepository.create(user);
  //   // await this.userRepository.save(newUser);
  //   // return newUser;

  //   const hashedpw = await bcrypt.hash(user.pw, 3);
    
  //   try {
  //     const createdUser = this.userRepository.create({
  //       ...user,
  //       pw: hashedpw,
  //     });
  //     createdUser.pw = undefined;
      
  //     return createdUser;
  //   } catch (error) {
  //     if (error?.code === PostgresErrorCode.UniqueViolation) {
  //       throw new HttpException (
  //         '사용자 이메일은 이미 존재합니다.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }

  //     throw new HttpException (
  //       '알 수 없는 오류가 발생했습니다.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async findOne(name: string) {
    return this.userRepository.findOneBy({ name })
    // const passwordInPlaintext = '12345678';
    // const hash = await bcrypt.hash(passwordInPlaintext, 10);

    // const isPasswordMatching = await bcrypt.compare(
    //   passwordInPlaintext,
    //   hashedPassword,
    // );

    // console.log(isPasswordMatching); // true


    // try {
    //   const userInfo = await this.userRepository.findOneBy(user.name);
    //   const isMatching = await bcrypt.compare(
    //     'asdasd',
    //     userInfo.pw,
    //   );

    //   if (!isMatching) {
    //     throw new HttpException(
    //       '잘못된 인증 정보입니다.',
    //       HttpStatus.BAD_REQUEST,
    //     );
    //   }

    //   user.pw = undefined;

    //   return user;
    // } catch (error) {
    //   throw new HttpException(
    //     '잘못된 인증 정보입니다.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
  }

  // public async getAuthenticatedUser(user: loginUserDto) {
  //   try {
  //     const userinfo = await this.userRepository.findOneBy({ name: user.name });
  //     await this.verifyPassword('gadsfgdfg', userinfo.pw);
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

  // asdf(): User[] {
  //   return this.users;
  // }

  // getId(id: number): User {
  //   const user = this.users[id];

  //   if (!user) {
  //     throw new NotFoundException(`응 ${id} 없음`)
  //   }

  //   return user;
  // }

  // deleteId(id: number) {
  //   this.getId(id)
  //   this.users[id]
  // }

  // createId(user:createUserDto) {
  //   return "adsf"
  // }
}
