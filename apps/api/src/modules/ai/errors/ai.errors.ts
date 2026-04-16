export class AiProviderUnavailableError extends Error {
  constructor(
    public provider: string,
    public originalError: Error,
    message = 'AI provider is unavailable',
  ) {
    super(message);
    this.name = 'AiProviderUnavailableError';
    Object.setPrototypeOf(this, AiProviderUnavailableError.prototype);
  }
}

export class AiResponseParseError extends Error {
  constructor(
    public provider: string,
    public originalError: Error,
    message = 'Failed to parse AI response',
  ) {
    super(message);
    this.name = 'AiResponseParseError';
    Object.setPrototypeOf(this, AiResponseParseError.prototype);
  }
}

export class AiRateLimitError extends Error {
  constructor(
    public provider: string,
    public originalError: Error,
    message = 'Rate limit reached',
  ) {
    super(message);
    this.name = 'AiRateLimitError';
    Object.setPrototypeOf(this, AiRateLimitError.prototype);
  }
}

export class AiQuotaExhaustedError extends Error {
  constructor(
    public provider: string,
    public originalError: Error,
    message = 'Free quota exhausted',
  ) {
    super(message);
    this.name = 'AiQuotaExhaustedError';
    Object.setPrototypeOf(this, AiQuotaExhaustedError.prototype);
  }
}
