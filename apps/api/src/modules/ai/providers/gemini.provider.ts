import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AiRateLimitError, AiProviderUnavailableError } from '../errors/ai.errors';

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
  private readonly maxRetries = 2;

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
    return this.generateWithRetry(prompt, modelName, options, 0);
  }

  private async generateWithRetry(
    prompt: string,
    modelName: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
    },
    retryCount: number = 0,
  ): Promise<AiResult> {
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
      const errorMessage = (error as Error).message;
      const statusCode = (error as any).status;

      // Rate limit error - retry with delay
      if (statusCode === 429 && retryCount < this.maxRetries) {
        const backoffMs = 2000;
        this.logger.warn(
          `Gemini rate limited (attempt ${retryCount + 1}/${this.maxRetries}). Retrying in ${backoffMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return this.generateWithRetry(prompt, modelName, options, retryCount + 1);
      }

      // Timeout error - retry with shorter delay
      if (
        (errorMessage.includes('timeout') || errorMessage.includes('ECONNRESET')) &&
        retryCount < this.maxRetries
      ) {
        const backoffMs = 1000;
        this.logger.warn(
          `Gemini timeout (attempt ${retryCount + 1}/${this.maxRetries}). Retrying in ${backoffMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return this.generateWithRetry(prompt, modelName, options, retryCount + 1);
      }

      // All retries exhausted or non-retryable error
      this.logger.error(
        `Gemini API error after ${retryCount} retries: ${errorMessage}`,
      );
      throw new AiProviderUnavailableError(
        'gemini',
        error as Error,
        `Gemini provider failed: ${errorMessage}`,
      );
    }
  }
}
