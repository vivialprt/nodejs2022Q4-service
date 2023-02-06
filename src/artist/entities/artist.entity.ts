import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Artist {
  @IsUUID('4')
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  grammy: boolean;
}
