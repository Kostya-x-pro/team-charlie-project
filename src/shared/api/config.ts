import 'server-only';

export const AVAILABLE_LANGUAGES = ['ru', 'en'] as const;
export type Lang = (typeof AVAILABLE_LANGUAGES)[number];

export type CacheStrategy = 'force-cache' | 'no-store';
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type QueryValue = string | number | boolean | null | undefined;

export interface QueryParams {
  [key: string]: QueryValue;
}

export interface NextRequestOptions {
  revalidate?: number | false;
  tags?: string[];
}

export interface ApiRuntimeConfig {
  baseUrl: string;
  apiKey: string;
}

export const API_KEY_HEADER = 'x-api-key';
export const DEFAULT_TIMEOUT_MS = 45_000;
export const DEFAULT_LANGUAGE: Lang = 'en';

const getRequiredEnv = (
  name: 'BACKEND_API_URL' | 'BACKEND_API_KEY',
): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};

export const getApiRuntimeConfig = (): ApiRuntimeConfig => {
  return {
    baseUrl: getRequiredEnv('BACKEND_API_URL').replace(/\/+$/, ''),
    apiKey: getRequiredEnv('BACKEND_API_KEY'),
  };
};
