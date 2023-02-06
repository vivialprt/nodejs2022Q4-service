import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class Album {
  @IsUUID('4')
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  year: number;
  @ApiPropertyOptional()
  artistId: string | null; // refers to Artist
}
