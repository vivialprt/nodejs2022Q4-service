import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.prisma.track.create({data: {
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    }});
    return track;
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({where: { id }});

    if (!track) throw new NotFoundException();
    else return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({where: { id }});
    if (!track) throw new NotFoundException();

    const updatedTrack = await this.prisma.track.update({
      where: {
        id,
      },
      data: {
        ...track,
        name: updateTrackDto.name ?? track.name,
        artistId:
          updateTrackDto.artistId == undefined ? track.artistId : updateTrackDto.artistId,
        albumId:
          updateTrackDto.albumId == undefined ? track.artistId : updateTrackDto.artistId,
        duration: updateTrackDto.duration ?? track.duration,
      },
    });
    return updatedTrack;
  }

  async remove(id: string) {
    const track = await this.prisma.track.findUnique({where: { id }});
    if (!track) throw new NotFoundException();
    await this.prisma.favouriteTrack.deleteMany({where: { trackId: id }});

    await this.prisma.track.delete({where: { id }});
  }
}
