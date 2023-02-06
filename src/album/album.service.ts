import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FavouritesService } from 'src/favourites/favourites.service';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  public albums: Album[] = [];
  @Inject(TrackService)
  public trackService: TrackService;
  @Inject(forwardRef(() => FavouritesService))
  public favoriteService: FavouritesService;

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album();
    album.id = randomUUID();
    album.name = createAlbumDto.name;
    album.year = createAlbumDto.year;
    album.artistId = createAlbumDto.artistId;
    this.albums.push(album);
    return album;
  }

  async findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);

    if (!album) throw new NotFoundException();
    else return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const idx = this.albums.findIndex((album) => album.id === id);
    if (idx === -1) throw new NotFoundException();

    if (updateAlbumDto.name) this.albums.at(idx).name = updateAlbumDto.name;
    if (updateAlbumDto.year) this.albums.at(idx).year = updateAlbumDto.year;
    if (updateAlbumDto.artistId !== undefined)
      this.albums.at(idx).artistId = updateAlbumDto.artistId;
    return this.albums.at(idx);
  }

  async remove(id: string) {
    const idx = this.albums.findIndex((album) => album.id === id);
    if (idx === -1) throw new NotFoundException();
    this.trackService.tracks.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
    const idxInFavs = this.favoriteService.favs.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (idxInFavs !== -1)
      this.favoriteService.favs.artists.splice(idxInFavs, 1);
    this.albums.splice(idx, 1);
    return;
  }
}
