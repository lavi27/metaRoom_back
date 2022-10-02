import { Controller, Get, Post, Put, Delete, Patch, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import User from './entity/user.entity';
import { createUserDto } from './dto/create-user.dto';
import { getUserDto } from './dto/get-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(id: getUserDto): Promise<any> {
    return this.userService.getUser(id);
  }

  // @Get('search')
  // search(): User[] {
  //   return this.userService.asdf();
  // }

  // @Get(':id')
  // getId(@Param('id') id:number): User {
  //   return this.userService.getId(id);
  // }

  // @Post('login')
  // login(@Body() user:createUserDto) {
  //   return this.userService.login(user);
  // }

  // @Put(':id')  //전체 업데이트
  // putId(@Param('id') id:string) {
  //   return `1234 ${id}`;
  // }

  // @Patch(':id')  //일부분 업데이트
  // patchId(@Param('id') id:string, @Body() data) {
  //   return `1234 ${id}`;
  // }

  // @Delete(':id')  //삭제
  // deleteId(@Param('id') id:number) {
  //   return this.userService.deleteId(id);
  // }
}
