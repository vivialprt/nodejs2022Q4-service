import {
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesRepsonse } from './entities/favourite.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<FavoritesRepsonse> {
    const favArtists = await this.prisma.favouriteArtist.findMany({select: { artistId: true }});
    const favArtistsIds = favArtists.map(artist => artist.artistId);
    const artists = await this.prisma.artist.findMany({
      where: { id: { in: favArtistsIds}}
    });

    const favAlbums = await this.prisma.favouriteAlbum.findMany({select: { albumId: true }});
    const favAlbumsIds = favAlbums.map(album => album.albumId);
    const albums = await this.prisma.album.findMany({
      where: { id: { in: favAlbumsIds}}
    });

    const favTracks = await this.prisma.favouriteTrack.findMany({select: { trackId: true }});
    const favTracksIds = favTracks.map(track => track.trackId);
    const tracks = await this.prisma.track.findMany({
      where: { id: { in: favTracksIds}}
    });
    return {
      artists: artists,
      albums: albums,
      tracks: tracks
    };
  }

  async addTrack(id: string) {
    const track = await this.prisma.track.findUnique({where: { id }});
    if (!track) throw new UnprocessableEntityException();

    await this.prisma.favouriteTrack.create({data: { trackId: track.id }});
    return;
  }

  async removeTrack(id: string) {
    await this.prisma.favouriteTrack.deleteMany({where: { trackId: id }});
  }

  async addAlbum(id: string) {
    const album = await this.prisma.album.findUnique({where: { id }});
    if (!album) throw new UnprocessableEntityException();

    await this.prisma.favouriteAlbum.create({data: { albumId: album.id }});
    return;
  }

  async removeAlbum(id: string) {
    await this.prisma.favouriteAlbum.deleteMany({where: { albumId: id }});
  }

  async addArtist(id: string) {
    const artist = await this.prisma.artist.findUnique({where: { id }});
    if (!artist) throw new UnprocessableEntityException();

    await this.prisma.favouriteArtist.create({data: { artistId: artist.id }});
    return;
  }

  async removeArtist(id: string) {
    await this.prisma.favouriteArtist.deleteMany({where: { artistId: id }});
  }
}
