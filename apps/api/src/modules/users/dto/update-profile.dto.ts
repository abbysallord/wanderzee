import { IsOptional, IsString, IsEnum, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BudgetLevel, TripType } from '@prisma/client';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'en' })
  @IsOptional()
  @IsString()
  preferredLanguage?: string;

  @ApiPropertyOptional({ enum: BudgetLevel })
  @IsOptional()
  @IsEnum(BudgetLevel)
  defaultBudgetLevel?: BudgetLevel;

  @ApiPropertyOptional({ enum: TripType })
  @IsOptional()
  @IsEnum(TripType)
  defaultTripType?: TripType;

  @ApiPropertyOptional({ example: ['vegetarian', 'no-beef'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dietaryPreferences?: string[];

  @ApiPropertyOptional({ example: ['wheelchair-access'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accessibilityNeeds?: string[];

  @ApiPropertyOptional({ example: 'Mild asthma, carry inhaler' })
  @IsOptional()
  @IsString()
  healthNotes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  culturalPreferences?: string;

  @ApiPropertyOptional({ example: 'Jane Doe' })
  @IsOptional()
  @IsString()
  emergencyContact?: string;

  @ApiPropertyOptional({ example: '+91-9876543210' })
  @IsOptional()
  @IsString()
  emergencyPhone?: string;
}
