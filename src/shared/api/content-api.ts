import 'server-only';

import { createRequest } from './client';

export type ContactMethod = 'telegram' | 'whatsapp' | 'email';

export interface ContactFormPayload {
  name?: string;
  method: ContactMethod;
  contact: string;
}

export type BenefitsResponse = unknown;
export type MultiplyResponse = unknown;
export type TasksResponse = unknown;
export type FormResponse = unknown;

const CONTENT_REVALIDATE_SECONDS = 600;

export const getBenefits = createRequest<BenefitsResponse>({
  path: '/benefits',
  method: 'GET',
  localized: true,
  cache: 'force-cache',
  next: {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ['benefits'],
  },
});

export const getMultiply = createRequest<MultiplyResponse>({
  path: '/multiply',
  method: 'GET',
  localized: true,
  cache: 'force-cache',
  next: {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ['multiply'],
  },
});

export const getTasks = createRequest<TasksResponse>({
  path: '/tasks',
  method: 'GET',
  localized: true,
  cache: 'force-cache',
  next: {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags: ['tasks'],
  },
});

export const sendContactForm = createRequest<FormResponse, ContactFormPayload>({
  path: '/form',
  method: 'POST',
  cache: 'no-store',
  timeoutMs: 60_000,
});
