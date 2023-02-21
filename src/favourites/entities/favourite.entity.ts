import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavoritesRepsonse {
  @ApiProperty()
  artists: Artist[];
  @ApiProperty()
  albums: Album[];
  @ApiProperty()
  tracks: Track[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export class Favorites {
  @ApiProperty()
  artists: string[];
  @ApiProperty()
  albums: string[];
  @ApiProperty()
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
