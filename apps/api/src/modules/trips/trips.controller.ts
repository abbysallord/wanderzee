import { Controller, Get, Param, Patch, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { TripStatus } from '@prisma/client';

@ApiTags('trips')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all trips for current user' })
  @ApiQuery({ name: 'status', required: false, enum: TripStatus })
  getUserTrips(@CurrentUser('id') userId: string, @Query('status') status?: TripStatus) {
    return this.tripsService.getUserTrips(userId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  getTripById(@CurrentUser('id') userId: string, @Param('id') tripId: string) {
    return this.tripsService.getTripById(userId, tripId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update trip status' })
  updateStatus(
    @CurrentUser('id') userId: string,
    @Param('id') tripId: string,
    @Body('status') status: TripStatus,
  ) {
    return this.tripsService.updateTripStatus(userId, tripId, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a trip' })
  deleteTrip(@CurrentUser('id') userId: string, @Param('id') tripId: string) {
    return this.tripsService.deleteTrip(userId, tripId);
  }
}
