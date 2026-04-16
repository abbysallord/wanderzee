import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AiResult {
  content: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

@Injectable()
export class GeminiProvider {
  private client: GoogleGenerativeAI;
  private readonly logger = new Logger(GeminiProvider.name);

  constructor(private configService: ConfigService) {
    this.client = new GoogleGenerativeAI(
      this.configService.get<string>('GEMINI_API_KEY') ?? '',
    );
  }

  async generate(
    prompt: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
    },
  ): Promise<AiResult> {
    const modelName = options?.model ?? 'gemini-2.0-flash';

    try {
      const model = this.client.getGenerativeModel({
        model: modelName,
        generationConfig: {
          maxOutputTokens: options?.maxTokens ?? 8192,
          temperature: options?.temperature ?? 0.7,
        },
        systemInstruction:
          'You are WanderZee AI, an expert travel planner for Karnataka, India. You provide detailed, accurate, and culturally sensitive travel recommendations. Always respond in valid JSON when asked.',
      });

      const result = await model.generateContent(prompt);
      const response = result.response;

      return {
        content: response.text(),
        model: modelName,
        promptTokens: response.usageMetadata?.promptTokenCount ?? 0,
        completionTokens: response.usageMetadata?.candidatesTokenCount ?? 0,
      };
    } catch (error) {
      this.logger.error(`Gemini API error: ${(error as Error).message}`);
      throw error;
    }
  }
}
