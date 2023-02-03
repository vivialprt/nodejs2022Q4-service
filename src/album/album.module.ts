import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from 'src/track/track.module';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavouritesModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
