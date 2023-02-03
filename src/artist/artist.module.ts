import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TrackModule } from 'src/track/track.module';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [TrackModule, forwardRef(() => FavouritesModule)],
  exports: [ArtistService],
})
export class ArtistModule {}
