import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  public users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.login = createUserDto.login;
    user.password = createUserDto.password;
    user.id = randomUUID();
    user.version = 1;
    user.createdAt = new Date().getTime();
    user.updatedAt = new Date().getTime();

    this.users.push(user);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException();
    else return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) throw new NotFoundException();

    if (this.users.at(idx).password !== updatePasswordDto.oldPassword)
      throw new ForbiddenException();

    this.users.at(idx).password = updatePasswordDto.newPassword;
    this.users.at(idx).version++;
    this.users.at(idx).updatedAt = new Date().getTime();
    return this.users.at(idx);
  }

  async remove(id: string) {
    const idx = this.users.findIndex((user) => user.id === id);
    if (idx === -1) throw new NotFoundException();

    this.users.splice(idx, 1);
    return;
  }
}
