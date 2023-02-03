import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsUUID()
  @IsOptional()
  artistId?: string;
  @IsUUID()
  @IsOptional()
  albumId?: string;
  @IsNumber()
  duration: number;
}
