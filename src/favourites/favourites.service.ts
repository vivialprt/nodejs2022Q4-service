import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, FavoritesRepsonse } from './entities/favourite.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavouritesService {
  public favs: Favorites = new Favorites();
  @Inject(forwardRef(() => TrackService))
  public trackService: TrackService;
  @Inject(forwardRef(() => AlbumService))
  public albumService: AlbumService;
  @Inject(forwardRef(() => ArtistService))
  public artistService: ArtistService;

  async getAll(): Promise<FavoritesRepsonse> {
    return {
      artists: this.artistService.artists.filter((artist) =>
        this.favs.artists.includes(artist.id),
      ),
      albums: this.albumService.albums.filter((album) =>
        this.favs.albums.includes(album.id),
      ),
      tracks: this.trackService.tracks.filter((track) =>
        this.favs.tracks.includes(track.id),
      ),
    };
  }

  async addTrack(id: string) {
    const idx = this.trackService.tracks.findIndex((track) => track.id === id);
    if (idx === -1) throw new UnprocessableEntityException();

    this.favs.tracks.push(this.trackService.tracks.at(idx).id);
    return;
  }

  async removeTrack(id: string) {
    const idx = this.favs.tracks.findIndex((trackId) => trackId === id);
    if (idx === -1) throw new NotFoundException();

    this.favs.tracks.splice(idx, 1);
    return;
  }

  async addAlbum(id: string) {
    const idx = this.albumService.albums.findIndex((album) => album.id === id);
    if (idx === -1) throw new UnprocessableEntityException();

    this.favs.albums.push(this.albumService.albums.at(idx).id);
    return;
  }

  async removeAlbum(id: string) {
    const idx = this.favs.albums.findIndex((albumId) => albumId === id);
    if (idx === -1) throw new NotFoundException();

    this.favs.albums.splice(idx, 1);
    return;
  }

  async addArtist(id: string) {
    const idx = this.artistService.artists.findIndex(
      (artist) => artist.id === id,
    );
    if (idx === -1) throw new UnprocessableEntityException();

    this.favs.artists.push(this.artistService.artists.at(idx).id);
    return;
  }

  async removeArtist(id: string) {
    const idx = this.favs.artists.findIndex((artistId) => artistId === id);
    if (idx === -1) throw new NotFoundException();

    this.favs.artists.splice(idx, 1);
    return;
  }
}
