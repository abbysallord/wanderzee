import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { TripStatus } from '@prisma/client';

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async getUserTrips(userId: string, status?: TripStatus) {
    const where: Record<string, unknown> = { userId };
    if (status) where.status = status;

    return this.prisma.trip.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        days: {
          orderBy: { dayNumber: 'asc' },
          include: {
            activities: { orderBy: { orderIndex: 'asc' } },
          },
        },
      },
    });
  }

  async getTripById(userId: string, tripId: string) {
    const trip = await this.prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        days: {
          orderBy: { dayNumber: 'asc' },
          include: {
            activities: { orderBy: { orderIndex: 'asc' } },
          },
        },
        expenses: { orderBy: { paidAt: 'desc' } },
      },
    });

    if (!trip) throw new NotFoundException('Trip not found');
    if (trip.userId !== userId) throw new ForbiddenException('You do not have access to this trip');

    return trip;
  }

  async updateTripStatus(userId: string, tripId: string, status: TripStatus) {
    const trip = await this.getTripById(userId, tripId);
    return this.prisma.trip.update({
      where: { id: trip.id },
      data: { status },
    });
  }

  async deleteTrip(userId: string, tripId: string) {
    const trip = await this.getTripById(userId, tripId);
    await this.prisma.trip.delete({ where: { id: trip.id } });
    return { message: 'Trip deleted successfully' };
  }
}
