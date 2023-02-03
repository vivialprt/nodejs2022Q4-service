import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavoritesRepsonse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }
}
