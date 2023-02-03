import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavouritesModule } from 'src/favourites/favourites.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [forwardRef(() => FavouritesModule)],
  exports: [TrackService],
})
export class TrackModule {}
