import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TrackService } from 'src/track/track.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  public albums: Album[] = [];
  @Inject(TrackService)
  public TrackService: TrackService;

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
    if (updateAlbumDto.artistId !== undefined) this.albums.at(idx).artistId = updateAlbumDto.artistId;
    return this.albums.at(idx);
  }

  async remove(id: string) {
    const idx = this.albums.findIndex((album) => album.id === id);
    if (idx === -1) throw new NotFoundException();
    this.TrackService.tracks.forEach(track => {
      if (track.albumId === id) track.albumId = null
    });
    this.albums.splice(idx, 1);
    return;
  }
}
