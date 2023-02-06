import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AlbumService } from 'src/album/album.service';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TrackService } from 'src/track/track.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  public artists: Artist[] = [];
  @Inject(TrackService)
  public trackService: TrackService;
  @Inject(AlbumService)
  public albumService: AlbumService;
  @Inject(forwardRef(() => FavouritesService))
  public favoriteService: FavouritesService;

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist();
    artist.id = randomUUID();
    artist.grammy = createArtistDto.grammy;
    artist.name = createArtistDto.name;
    this.artists.push(artist);
    return artist;
  }

  async findAll() {
    return this.artists;
  }

  async findOne(id: string) {
    const artist = this.artists.find((user) => user.id === id);

    if (!artist) throw new NotFoundException();
    else return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const idx = this.artists.findIndex((user) => user.id === id);
    if (idx === -1) throw new NotFoundException();
    if (updateArtistDto.name) this.artists.at(idx).name = updateArtistDto.name;
    if (updateArtistDto.grammy !== null && updateArtistDto.grammy !== undefined)
      this.artists.at(idx).grammy = updateArtistDto.grammy;
    return this.artists.at(idx);
  }

  async remove(id: string) {
    const idx = this.artists.findIndex((artist) => artist.id === id);
    if (idx === -1) throw new NotFoundException();
    this.trackService.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });
    this.albumService.albums.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
    const idxInFavs = this.favoriteService.favs.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (idxInFavs !== -1)
      this.favoriteService.favs.artists.splice(idxInFavs, 1);
    this.artists.splice(idx, 1);
    return;
  }
}
