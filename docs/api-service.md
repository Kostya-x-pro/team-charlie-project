# API service

## Назначение

Сервис в `src/shared/api` нужен для безопасной работы с бекендом из серверной части Next.js.

Он решает несколько задач:

- хранит общую логику запросов в одном месте;
- автоматически добавляет обязательный заголовок `x-api-key`;
- централизованно управляет `cache`, `revalidate` и `timeout`;
- отдает готовые методы для конкретных ручек.

## Структура

```text
src/shared/api/
  client.ts
  config.ts
  content-api.ts
  index.ts
```

### `config.ts`

Хранит общие настройки API:

- список поддерживаемых языков;
- дефолтный язык;
- дефолтный timeout;
- чтение `BACKEND_API_URL` и `BACKEND_API_KEY` из env.

### `client.ts`

Низкоуровневый транспортный слой.

Что делает:

- собирает абсолютный URL;
- добавляет `x-api-key`;
- сериализует body;
- выставляет timeout через `AbortController`;
- парсит ответ;
- кидает `ApiError`, если `response.ok === false`.

### `content-api.ts`

Слой готовых методов под конкретные ручки проекта:

- `getBenefits`
- `getMultiply`
- `getTasks`
- `sendContactForm`

Здесь удобно описывать стратегию кэширования для каждой ручки.

### `index.ts`

Публичная точка входа для импорта API-методов и типов.

## Почему запросы идут напрямую в бекенд

В проекте используется App Router и серверные компоненты.

Для такого сценария правильнее вызывать внешний бекенд напрямую из server-side кода, а не через локальные `route.ts`, потому что:

- нет лишнего HTTP-круга внутри самого Next.js;
- проще контролировать кэш и revalidate;
- это соответствует рекомендациям Next.js для Server Components.

## Как работает запрос

Пример на `getBenefits`:

1. Компонент или серверная функция вызывает `getBenefits({ lang: 'ru' })`.
2. `createRequest` собирает путь `/{lang}/benefits`.
3. `apiRequest` строит полный URL на основе `BACKEND_API_URL`.
4. В headers автоматически добавляется `x-api-key`.
5. `fetch` выполняется с явно заданной стратегией `cache`.
6. Ответ парсится как `json` или `text`.
7. Если бекенд вернул ошибку, выбрасывается `ApiError`.

## Кэширование

Для текущих GET-ручек используется:

- `cache: 'force-cache'`
- `next: { revalidate: 600 }`

Это означает:

- данные кэшируются на сервере Next.js;
- кэш обновляется не чаще одного раза в 10 минут.

Для мутаций, например `sendContactForm`, используется:

- `cache: 'no-store'`

Это означает, что POST-запрос всегда идет напрямую в бекенд без кэша.

## Timeout

По умолчанию timeout равен `45_000` ms.

Это сделано с учетом cold start у бекенда.

Для `sendContactForm` timeout отдельно увеличен до `60_000` ms.

## Переменные окружения

Сервис использует две переменные:

```env
BACKEND_API_URL
BACKEND_API_KEY
```

Локально нужно создать файл:

```text
.env.local
```

Пример:

```env
BACKEND_API_URL=https://example.com
BACKEND_API_KEY=your_api_key_here
```

## Как использовать

### GET-запрос

```ts
import { getBenefits } from '@/shared/api';

const benefits = await getBenefits({
  lang: 'ru',
});
```

### POST-запрос

```ts
import { sendContactForm } from '@/shared/api';

await sendContactForm({
  body: {
    name: 'John',
    method: 'telegram',
    contact: '@john_dev',
  },
});
```

## Как добавить новую ручку

Пример для локализованной GET-ручки:

```ts
export const getExample = createRequest<ExampleResponse>({
  path: '/example',
  method: 'GET',
  localized: true,
  cache: 'force-cache',
  next: {
    revalidate: 600,
    tags: ['example'],
  },
});
```

Пример для POST-ручки:

```ts
export const sendExample = createRequest<ExampleResponse, ExamplePayload>({
  path: '/example',
  method: 'POST',
  cache: 'no-store',
});
```

## Важные правила

- использовать сервис только на сервере, если запрос требует секретный `x-api-key`;
- всегда явно указывать стратегию `cache`;
- новые object-shaped данные описывать через `interface`;
- union и служебные типы описывать через `type`;
- не вызывать внешний API напрямую из random-компонентов, если уже есть метод в `shared/api`.
