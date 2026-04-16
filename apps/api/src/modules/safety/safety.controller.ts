import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SafetyService } from './safety.service';

@ApiTags('safety')
@Controller('safety')
export class SafetyController {
  constructor(private safetyService: SafetyService) {}

  @Get('advisories')
  @ApiOperation({ summary: 'Get active safety advisories' })
  @ApiQuery({ name: 'district', required: false })
  getAdvisories(@Query('district') district?: string) {
    return this.safetyService.getActiveAdvisories(district);
  }

  @Get('emergency-contacts')
  @ApiOperation({ summary: 'Get emergency contacts for a district' })
  @ApiQuery({ name: 'district', required: true })
  getEmergencyContacts(@Query('district') district: string) {
    return this.safetyService.getEmergencyContacts(district);
  }
}
