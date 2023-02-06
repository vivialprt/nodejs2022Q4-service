import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FavouritesService } from 'src/favourites/favourites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  public tracks: Track[] = [];
  @Inject(forwardRef(() => FavouritesService))
  public favoriteService: FavouritesService;

  async create(createTrackDto: CreateTrackDto) {
    const track = new Track();
    track.id = randomUUID();
    track.name = createTrackDto.name;
    track.duration = createTrackDto.duration;
    track.albumId = createTrackDto.albumId;
    track.artistId = createTrackDto.artistId;
    this.tracks.push(track);
    return track;
  }

  async findAll() {
    return this.tracks;
  }

  async findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);

    if (!track) throw new NotFoundException();
    else return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const idx = this.tracks.findIndex((track) => track.id === id);
    if (idx === -1) throw new NotFoundException();

    if (updateTrackDto.name) this.tracks.at(idx).name = updateTrackDto.name;
    if (updateTrackDto.duration) this.tracks.at(idx).name = updateTrackDto.name;
    if (updateTrackDto.artistId !== undefined)
      this.tracks.at(idx).artistId = updateTrackDto.artistId;
    if (updateTrackDto.albumId !== undefined)
      this.tracks.at(idx).albumId = updateTrackDto.albumId;
    return this.tracks.at(idx);
  }

  async remove(id: string) {
    const idx = this.tracks.findIndex((artists) => artists.id === id);
    if (idx === -1) throw new NotFoundException();
    const idxInFavs = this.favoriteService.favs.artists.findIndex(
      (artistId) => artistId === id,
    );
    if (idxInFavs !== -1)
      this.favoriteService.favs.artists.splice(idxInFavs, 1);
    this.tracks.splice(idx, 1);
    return;
  }
}
