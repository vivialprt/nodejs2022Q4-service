import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { FavouritesModule } from 'src/favourites/favourites.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, AlbumModule, forwardRef(() => FavouritesModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
