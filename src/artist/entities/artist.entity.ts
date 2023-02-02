import { IsUUID } from 'class-validator';

export class Artist {
  @IsUUID('4')
  id: string;
  name: string;
  grammy: boolean;
}
