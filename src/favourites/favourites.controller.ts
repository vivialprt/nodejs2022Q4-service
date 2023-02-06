import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { FavouritesService } from './favourites.service';

@Controller('favs')
@ApiTags('Favs')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Get()
  @ApiOperation({summary: 'Get all favorite tracks, albums and artists.'})
  async getAll() {
    return await this.favouritesService.getAll();
  }

  @Post('track/:id')
  @ApiOperation({summary: 'Add track to favorites.'})
  @ApiCreatedResponse({description: 'Track added to favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiUnprocessableEntityResponse({description: 'Track not found.'})
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({summary: 'Remove track from favorites.'})
  @ApiNoContentResponse({description: 'Track removed from favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Track not found in favorites.'})
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({summary: 'Add album to favorites.'})
  @ApiCreatedResponse({description: 'Album added to favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiUnprocessableEntityResponse({description: 'Album not found.'})
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({summary: 'Remove album from favorites.'})
  @ApiNoContentResponse({description: 'Album removed from favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Album not found in favorites.'})
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({summary: 'Add artist to favorites.'})
  @ApiCreatedResponse({description: 'Artist added to favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiUnprocessableEntityResponse({description: 'Artist not found.'})
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({summary: 'Remove artist from favorites.'})
  @ApiNoContentResponse({description: 'Artist removed from favorites.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Artist not found in favorites.'})
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favouritesService.removeArtist(id);
  }
}
