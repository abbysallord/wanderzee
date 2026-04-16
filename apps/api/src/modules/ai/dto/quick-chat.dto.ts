import { IsString, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QuickChatDto {
  @ApiProperty({ example: 'What are the best coffee plantations to visit in Coorg?', maxLength: 500 })
  @IsString()
  @MaxLength(500)
  query: string;

  @ApiPropertyOptional({ example: 'currently in Bengaluru' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  context?: string;
}
