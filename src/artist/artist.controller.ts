import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({summary: 'Create artist.'})
  @ApiBadRequestResponse({ description: 'Invalid request.'})
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all artists.'})
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get artist by id.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Artist not found.'})
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update artist.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Artist not found.'})
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist.' })
  @ApiNoContentResponse({description: 'Artist deleted.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Artist not found.'})
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
