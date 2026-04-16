import { Injectable } from '@nestjs/common';
import { GenerateTripDto } from '../dto/generate-trip.dto';

@Injectable()
export class PromptBuilder {
  buildTripPlanPrompt(dto: GenerateTripDto, placesContext?: string): string {
    const daysCount = this.calculateDays(dto.startDate, dto.endDate);

    return `
Generate a detailed ${daysCount}-day trip itinerary for ${dto.destination}, Karnataka, India.

## TRAVELER PROFILE
- Trip Type: ${dto.tripType}
- Group: ${dto.groupSize} person(s), ${dto.groupComposition ?? 'not specified'}
- Budget Level: ${dto.budgetLevel}${dto.budgetAmount ? ` (₹${dto.budgetAmount} total)` : ''}
- Dates: ${dto.startDate} to ${dto.endDate}
- Starting From: ${dto.startingFrom ?? 'Bengaluru'}
- Interests: ${dto.interests?.join(', ') ?? 'general sightseeing'}
${dto.healthNotes ? `- Health Notes: ${dto.healthNotes}` : ''}
${dto.dietaryPreferences ? `- Dietary: ${dto.dietaryPreferences}` : ''}
${dto.specialRequests ? `- Special Requests: ${dto.specialRequests}` : ''}

${placesContext ? `## KNOWN PLACES IN THE AREA\n${placesContext}\n` : ''}

## REQUIREMENTS
1. Create a day-by-day itinerary with specific activities and time slots
2. Include transport suggestions between places (bus, auto, cab with estimated costs)
3. Include meal recommendations (breakfast, lunch, dinner) matching dietary preferences
4. Estimate costs for each activity
5. Add cultural tips and dress code notes where applicable
6. Consider weather and best visiting times
7. Include rest periods — don't over-schedule
8. Add safety notes if any
9. Suggest alternatives for each major activity (Plan B)

## RESPONSE FORMAT
Respond ONLY with valid JSON in this exact structure:
{
  "title": "Trip title",
  "summary": "2-3 sentence trip overview",
  "estimatedTotalBudget": {
    "min": 0,
    "max": 0,
    "currency": "INR",
    "breakdown": {
      "transport": 0,
      "accommodation": 0,
      "food": 0,
      "activities": 0,
      "misc": 0
    }
  },
  "packingTips": ["item1", "item2"],
  "culturalNotes": ["note1", "note2"],
  "days": [
    {
      "dayNumber": 1,
      "date": "2024-03-15",
      "title": "Day title",
      "summary": "Day overview",
      "activities": [
        {
          "orderIndex": 1,
          "title": "Activity name",
          "description": "What to do here",
          "startTime": "09:00",
          "endTime": "11:00",
          "activityType": "visit|food|transport|rest|shopping",
          "placeName": "Place name",
          "estimatedCost": 200,
          "transportMode": "walk|bus|auto|cab|train",
          "transportToNext": {
            "mode": "auto",
            "estimatedDuration": "20 mins",
            "estimatedCost": 150,
            "notes": "Ask for meter fare"
          },
          "tips": ["tip1"],
          "alternatives": ["alternative activity if this doesn't work out"]
        }
      ]
    }
  ],
  "emergencyInfo": {
    "nearestHospital": "Hospital name and location",
    "policeStation": "Station details",
    "tourismHelpline": "1800-xxx-xxxx"
  }
}`;
  }

  private calculateDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }
}
