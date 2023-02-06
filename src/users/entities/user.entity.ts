import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class User {
  @IsUUID('4')
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  login: string;
  @Exclude()
  @ApiProperty()
  password: string;
  @ApiProperty()
  version: number; // integer number, increments on update
  @ApiProperty()
  createdAt: number; // timestamp of creation
  @ApiProperty()
  updatedAt: number; // timestamp of last update
}
