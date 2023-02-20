import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.prisma.artist.create({data: {
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    }});
    return artist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({where: { id }});

    if (!artist) throw new NotFoundException();
    else return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.findUnique({where: { id }});
    if (!artist) throw new NotFoundException();

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: {
        ...artist,
        name: updateArtistDto.name ?? artist.name,
        grammy: updateArtistDto.grammy ?? artist.grammy,
      },
    });
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({where: { id }});
    if (!artist) throw new NotFoundException();

    await this.prisma.artist.delete({where: { id }});
  }
}
