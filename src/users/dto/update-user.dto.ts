import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto>;

export class UpdatePasswordDto {
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string; // previous password
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string; // new password
}
