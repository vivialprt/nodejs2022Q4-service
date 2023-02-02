import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNumber()
    @IsNotEmpty()
    year: number;
    @IsUUID()
    @IsOptional()
    artistId: string | null; // refers to Artist
}
