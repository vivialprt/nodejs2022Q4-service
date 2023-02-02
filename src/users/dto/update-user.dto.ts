import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto>;

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsNotEmpty()
  newPassword: string; // new password
}
