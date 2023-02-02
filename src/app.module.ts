import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UsersModule, ArtistModule, TrackModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
