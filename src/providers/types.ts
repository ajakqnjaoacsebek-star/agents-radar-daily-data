/**
 * Abstract LLM provider interface.
 *
 * All concrete providers must implement this contract so the rest of the
 * codebase can stay provider-agnostic.
 */

export interface LlmCallOptions {
  /** Cancels the underlying HTTP request when the caller no longer wants it. */
  signal?: AbortSignal;
}

export interface LlmProvider {
  /** Human-readable provider identifier (e.g. "anthropic", "openai"). */
  readonly name: string;
  /** Send a prompt and return the model's text response. */
  call(prompt: string, maxTokens: number, options?: LlmCallOptions): Promise<string>;
}

/** Factory function that creates an LlmProvider instance. */
export type ProviderFactory = () => LlmProvider;
