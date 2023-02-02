import { IsUUID } from "class-validator";

export class Album {
    @IsUUID('4')
    id: string; // uuid v4
    name: string;
    year: number;
    artistId: string | null; // refers to Artist
}
