import { Module } from '@nestjs/common';
import { FavouritesService } from './favourites.service';
import { FavouritesController } from './favourites.controller';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavouritesController],
  providers: [FavouritesService],
  imports: [AlbumModule, ArtistModule, TrackModule],
})
export class FavouritesModule {}
