import {
  IsString,
  IsEnum,
  IsInt,
  IsOptional,
  IsDateString,
  Min,
  Max,
  IsArray,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TripType, BudgetLevel } from '@prisma/client';

export class GenerateTripDto {
  @ApiProperty({ example: 'Coorg' })
  @IsString()
  destination: string;

  @ApiProperty({ enum: TripType, example: 'LEISURE' })
  @IsEnum(TripType)
  tripType: TripType;

  @ApiProperty({ enum: BudgetLevel, example: 'MODERATE' })
  @IsEnum(BudgetLevel)
  budgetLevel: BudgetLevel;

  @ApiPropertyOptional({ example: 50000 })
  @IsOptional()
  @IsNumber()
  @Min(500)
  budgetAmount?: number;

  @ApiProperty({ example: '2024-03-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-03-17' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(50)
  groupSize: number;

  @ApiPropertyOptional({ example: 'couple' })
  @IsOptional()
  @IsString()
  groupComposition?: string;

  @ApiPropertyOptional({ example: ['nature', 'food', 'photography'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  interests?: string[];

  @ApiPropertyOptional({ example: 'Mild asthma, prefer low-exertion activities' })
  @IsOptional()
  @IsString()
  healthNotes?: string;

  @ApiPropertyOptional({ example: 'vegetarian' })
  @IsOptional()
  @IsString()
  dietaryPreferences?: string;

  @ApiPropertyOptional({ example: 'Would prefer to avoid very crowded tourist spots' })
  @IsOptional()
  @IsString()
  specialRequests?: string;

  @ApiPropertyOptional({ example: 'Bengaluru' })
  @IsOptional()
  @IsString()
  startingFrom?: string;
}
