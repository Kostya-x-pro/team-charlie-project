import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiRequest, createRequest } from './client';

describe('API client', () => {
  beforeEach(() => {
    vi.stubEnv('BACKEND_API_URL', 'https://api.example.com/');
    vi.stubEnv('BACKEND_API_KEY', 'test-api-key');
    vi.stubGlobal('fetch', vi.fn());
  });

  it('собирает JSON-запрос с query и обязательным API-заголовком', async () => {
    const fetchMock = vi.mocked(fetch);

    fetchMock.mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    await apiRequest<{ success: boolean }, { name: string }>({
      path: '/form',
      method: 'POST',
      body: { name: 'Alex' },
      query: { source: 'landing', empty: null },
    });

    const [url, requestInit] = fetchMock.mock.calls[0]!;

    expect(url).toBe('https://api.example.com/form?source=landing');
    expect(requestInit?.body).toBe(JSON.stringify({ name: 'Alex' }));
    expect(new Headers(requestInit?.headers).get('x-api-key')).toBe(
      'test-api-key',
    );
    expect(new Headers(requestInit?.headers).get('content-type')).toBe(
      'application/json',
    );
  });

  it('добавляет выбранный язык в локализованный URL', async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    const getBenefits = createRequest<void>({
      path: '/benefits',
      method: 'GET',
      localized: true,
    });

    await getBenefits({ lang: 'ru' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/ru/benefits',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('возвращает ApiError с ответом сервера', async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Invalid request' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }),
    );

    await expect(apiRequest({ path: '/form' })).rejects.toMatchObject({
    name: 'ApiError',
    message: 'Request failed with status 400',
    status: 400,
    response: { message: 'Invalid request' },
    });
  });
});
