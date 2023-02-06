import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class Track {
  @IsUUID('4')
  @ApiProperty()
  id: string; // uuid v4
  @ApiProperty()
  name: string;
  @ApiProperty()
  artistId: string | null; // refers to Artist
  @ApiPropertyOptional()
  albumId: string | null; // refers to Album
  @ApiPropertyOptional()
  duration: number; // integer number
}
