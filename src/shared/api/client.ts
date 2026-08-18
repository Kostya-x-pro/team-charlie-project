import 'server-only';

import {
  API_KEY_HEADER,
  DEFAULT_LANGUAGE,
  DEFAULT_TIMEOUT_MS,
  getApiRuntimeConfig,
} from './config';
import type {
  CacheStrategy,
  HttpMethod,
  Lang,
  NextRequestOptions,
  QueryParams,
} from './config';

export interface ApiRequestOptions<TBody = unknown> {
  path: string;
  method?: HttpMethod;
  body?: TBody;
  query?: QueryParams;
  headers?: HeadersInit;
  cache?: CacheStrategy;
  next?: NextRequestOptions;
  timeoutMs?: number;
}

export interface ExecuteRequestOptions<TBody = unknown> {
  lang?: Lang;
  body?: TBody;
  query?: QueryParams;
  headers?: HeadersInit;
  cache?: CacheStrategy;
  next?: NextRequestOptions;
  timeoutMs?: number;
}

export interface RequestFactoryOptions {
  path: string;
  method: HttpMethod;
  localized?: boolean;
  headers?: HeadersInit;
  cache?: CacheStrategy;
  next?: NextRequestOptions;
  timeoutMs?: number;
}

export interface ApiErrorParams {
  message: string;
  status: number;
  response: unknown;
}

export class ApiError extends Error {
  public status: number;
  public response: unknown;

  constructor({ message, status, response }: ApiErrorParams) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.response = response;
  }
}

interface PreparedRequestBody {
  body: BodyInit | undefined;
  isJson: boolean;
}

const normalizePath = (path: string): string => {
  return path.startsWith('/') ? path : `/${path}`;
};

const buildUrl = (path: string, query?: QueryParams): string => {
  const { baseUrl } = getApiRuntimeConfig();
  const url = new URL(normalizePath(path), `${baseUrl}/`);

  if (!query) {
    return url.toString();
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    url.searchParams.set(key, String(value));
  });

  return url.toString();
};

const prepareRequestBody = (body?: unknown): PreparedRequestBody => {
  if (body === undefined) {
    return {
      body: undefined,
      isJson: false,
    };
  }

  if (
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    typeof body === 'string' ||
    body instanceof Blob ||
    body instanceof ArrayBuffer ||
    ArrayBuffer.isView(body)
  ) {
    return {
      body: body as BodyInit,
      isJson: false,
    };
  }

  return {
    body: JSON.stringify(body),
    isJson: true,
  };
};

const buildHeaders = (
  headers?: HeadersInit,
  options?: PreparedRequestBody,
): Headers => {
  const { apiKey } = getApiRuntimeConfig();
  const preparedHeaders = new Headers(headers);

  preparedHeaders.set(API_KEY_HEADER, apiKey);

  if (options?.isJson) {
    preparedHeaders.set('content-type', 'application/json');
  }

  return preparedHeaders;
};

const parseResponse = async <TResponse>(
  response: Response,
): Promise<TResponse> => {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return (await response.json()) as TResponse;
  }

  return (await response.text()) as TResponse;
};

const createAbortSignal = (
  timeoutMs: number,
): {
  signal: AbortSignal;
  cancel: () => void;
} => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cancel: () => clearTimeout(timeoutId),
  };
};

export const apiRequest = async <TResponse, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<TResponse> => {
  const {
    path,
    method = 'GET',
    body,
    query,
    headers,
    cache = 'no-store',
    next,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const { signal, cancel } = createAbortSignal(timeoutMs);
  const preparedBody = prepareRequestBody(body);

  try {
    const response = await fetch(buildUrl(path, query), {
      method,
      headers: buildHeaders(headers, preparedBody),
      body: preparedBody.body,
      cache,
      next,
      signal,
    });

    const parsedResponse = await parseResponse<unknown>(response);

    if (!response.ok) {
      throw new ApiError({
        message: `Request failed with status ${response.status}`,
        status: response.status,
        response: parsedResponse,
      });
    }

    return parsedResponse as TResponse;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }

    throw error;
  } finally {
    cancel();
  }
};

export const createRequest = <TResponse, TBody = unknown>(
  config: RequestFactoryOptions,
) => {
  return (options: ExecuteRequestOptions<TBody> = {}): Promise<TResponse> => {
    const path = config.localized
      ? `/${options.lang ?? DEFAULT_LANGUAGE}${normalizePath(config.path)}`
      : normalizePath(config.path);

    return apiRequest<TResponse, TBody>({
      path,
      method: config.method,
      body: options.body,
      query: options.query,
      headers: options.headers ?? config.headers,
      cache: options.cache ?? config.cache,
      next: options.next ?? config.next,
      timeoutMs: options.timeoutMs ?? config.timeoutMs,
    });
  };
};
