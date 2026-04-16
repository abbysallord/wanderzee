import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TripsModule } from './modules/trips/trips.module';
import { PlacesModule } from './modules/places/places.module';
import { AiModule } from './modules/ai/ai.module';
import { SafetyModule } from './modules/safety/safety.module';
import { BudgetModule } from './modules/budget/budget.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    TripsModule,
    PlacesModule,
    AiModule,
    SafetyModule,
    BudgetModule,
    HealthModule,
  ],
})
export class AppModule {}
