-- DropForeignKey
ALTER TABLE "fav_albums" DROP CONSTRAINT "fav_albums_albumId_fkey";

-- DropForeignKey
ALTER TABLE "fav_artists" DROP CONSTRAINT "fav_artists_artistId_fkey";

-- DropForeignKey
ALTER TABLE "fav_tracks" DROP CONSTRAINT "fav_tracks_trackId_fkey";

-- AddForeignKey
ALTER TABLE "fav_albums" ADD CONSTRAINT "fav_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fav_artists" ADD CONSTRAINT "fav_artists_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fav_tracks" ADD CONSTRAINT "fav_tracks_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
