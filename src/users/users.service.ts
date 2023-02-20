import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({data: {
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1
    }});

    const explicitUser = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
    return explicitUser;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(user => exclude(user, ['password']));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({where: { id }});
    if (!user) throw new NotFoundException();
    return exclude(user, ['password']);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({where: { id }});

    if (!user) throw new NotFoundException();

    if (user.password !== updatePasswordDto.oldPassword)
      throw new ForbiddenException();

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      },
    });

    const explicitUser = {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
    return explicitUser;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({where: { id }});
    if (!user) throw new NotFoundException();

    await this.prisma.user.delete({where: { id }});
  }
}

// Exclude keys from user
function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  };
  return user;
}
