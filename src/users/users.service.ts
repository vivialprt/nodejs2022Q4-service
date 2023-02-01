import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UsersService {

  public users: User[] = [];

  create(createUserDto: CreateUserDto) {
    let user = {
      'login': createUserDto.login,
      'password': createUserDto.password,
      'id': createUserDto.id ?? randomUUID(),
      'version': createUserDto.version ?? 1,
      'createdAt': createUserDto.createdAt ?? new Date().getTime(),
      'updatedAt': createUserDto.updatedAt ?? new Date().getTime()
    };
    this.users.push(user);
    let {password: _, ...userWithoutPassword} = user;
    return userWithoutPassword;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    if (!isUUID(id))
      throw new BadRequestException();
    for(let user of this.users) {
      if (user.id === id)
        return user;
    };
    throw new NotFoundException();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    this.users = this.users.filter(user => {user.id !== id});
    return;
  }
}
