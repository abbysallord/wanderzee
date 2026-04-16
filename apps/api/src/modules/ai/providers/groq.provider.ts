import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Groq from 'groq-sdk';
import { AiRateLimitError, AiProviderUnavailableError } from '../errors/ai.errors';

interface AiResult {
  content: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
}

@Injectable()
export class GroqProvider {
  private client: Groq;
  private readonly logger = new Logger(GroqProvider.name);
  private readonly maxRetries = 2;

  constructor(private configService: ConfigService) {
    this.client = new Groq({
      apiKey: configService.get<string>('GROQ_API_KEY'),
    });
  }

  async generate(
    prompt: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      jsonMode?: boolean;
    },
  ): Promise<AiResult> {
    const model = options?.model ?? 'llama-3.3-70b-versatile';
    return this.generateWithRetry(prompt, model, options, 0);
  }

  private async generateWithRetry(
    prompt: string,
    model: string,
    options?: {
      model?: string;
      maxTokens?: number;
      temperature?: number;
      jsonMode?: boolean;
    },
    retryCount: number = 0,
  ): Promise<AiResult> {
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content:
              'You are WanderZee AI, an expert travel planner for Karnataka, India. You provide detailed, accurate, and culturally sensitive travel recommendations. Always respond in valid JSON when asked.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: options?.maxTokens ?? 4096,
        temperature: options?.temperature ?? 0.7,
        response_format: options?.jsonMode ? { type: 'json_object' } : undefined,
      });

      return {
        content: response.choices[0]?.message?.content ?? '',
        model,
        promptTokens: response.usage?.prompt_tokens ?? 0,
        completionTokens: response.usage?.completion_tokens ?? 0,
      };
    } catch (error) {
      const errorMessage = (error as Error).message;
      const statusCode = (error as any).status;

      // Rate limit error - retry with delay
      if (statusCode === 429 && retryCount < this.maxRetries) {
        const backoffMs = 2000;
        this.logger.warn(
          `Groq rate limited (attempt ${retryCount + 1}/${this.maxRetries}). Retrying in ${backoffMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return this.generateWithRetry(prompt, model, options, retryCount + 1);
      }

      // Timeout error - retry with shorter delay
      if (
        (errorMessage.includes('timeout') || errorMessage.includes('ECONNRESET')) &&
        retryCount < this.maxRetries
      ) {
        const backoffMs = 1000;
        this.logger.warn(
          `Groq timeout (attempt ${retryCount + 1}/${this.maxRetries}). Retrying in ${backoffMs}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, backoffMs));
        return this.generateWithRetry(prompt, model, options, retryCount + 1);
      }

      // All retries exhausted or non-retryable error
      this.logger.error(
        `Groq API error after ${retryCount} retries: ${errorMessage}`,
      );
      throw new AiProviderUnavailableError(
        'groq',
        error as Error,
        `Groq provider failed: ${errorMessage}`,
      );
    }
  }
}
