import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.prisma.album.create({data: {
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    }});
    return album;
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({where: { id }});

    if (!album) throw new NotFoundException();
    else return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({where: { id }});
    if (!album) throw new NotFoundException();

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        name: updateAlbumDto.name ?? album.name,
        year: updateAlbumDto.year ?? album.year,
        artistId: updateAlbumDto.artistId == undefined ? album.artistId : updateAlbumDto.artistId,
      }
    });
    return updatedAlbum;
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({where: { id }});
    if (!album) throw new NotFoundException();

    await this.prisma.album.delete({where: { id }});
  }
}
