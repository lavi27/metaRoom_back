import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  asdf(): User[] {
    return this.users;
  }

  getId(id: number): User {
    const user = this.users[id];

    if (!user) {
      throw new NotFoundException(`응 ${id} 없음`)
    }

    return user;
  }

  deleteId(id: number) {
    this.getId(id)
    this.users[id]
  }

  createId(user:createUserDto) {
    return "adsf"
  }
}
