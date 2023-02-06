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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({summary: 'Create track.'})
  @ApiBadRequestResponse({ description: 'Invalid request.'})
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all tracks.'})
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get track by id.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Track not found.'})
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'Update track.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Track not found.'})
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track.' })
  @ApiNoContentResponse({description: 'Track deleted.'})
  @ApiBadRequestResponse({description: 'Invalid request.'})
  @ApiNotFoundResponse({description: 'Track not found.'})
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.remove(id);
  }
}
