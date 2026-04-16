import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { PlaceCategory } from '@prisma/client';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all places with filters' })
  @ApiQuery({ name: 'district', required: false })
  @ApiQuery({ name: 'category', required: false, enum: PlaceCategory })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  findAll(
    @Query('district') district?: string,
    @Query('category') category?: PlaceCategory,
    @Query('search') search?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.placesService.findAll({ district, category, search, page, limit });
  }

  @Get('districts')
  @ApiOperation({ summary: 'Get all Karnataka districts' })
  getDistricts() {
    return this.placesService.getDistricts();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find places near coordinates' })
  @ApiQuery({ name: 'lat', required: true })
  @ApiQuery({ name: 'lng', required: true })
  @ApiQuery({ name: 'radius', required: false, description: 'Radius in km' })
  findNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius?: number,
  ) {
    return this.placesService.findNearby(lat, lng, radius);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get place by ID' })
  findById(@Param('id') id: string) {
    return this.placesService.findById(id);
  }
}
