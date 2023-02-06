import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBadRequestResponse, ApiNotFoundResponse, ApiNoContentResponse } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({summary: 'Create album.'})
  @ApiBadRequestResponse({ description: 'Invalid request.'})
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all albums.'})
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get album by id.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Album not found.'})
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update album.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Album not found.'})
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album.' })
  @ApiNoContentResponse({description: 'Album deleted.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Album not found.'})
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.remove(id);
  }
}
