# Testing

## Инструменты

- **Vitest** запускает unit и integration-тесты.
- **React Testing Library** проверяет поведение React-компонентов.
- **jsdom** предоставляет DOM-окружение для компонентных тестов.
- **Playwright** запускает E2E-тесты в реальном браузере.
- **V8** формирует отчёт о покрытии проекта unit и integration-тестами .

## Подход

<u>Мы не стремимся покрыть тестами каждый файл или получить 100% coverage.</u>

<u>Тест добавляется, если он защищает важное поведение, бизнес-логику,
пользовательский сценарий или код с высокой вероятностью регрессии.
</u>

**Не пишем тесты только ради увеличения процента покрытия.**

## Unit-тесты

**Unit-тесты пишем для:**

- чистых функций с ветвлениями и преобразованием данных;
- валидаторов, парсеров и mapper-функций;
- API-клиента и формирования запросов;
- обработки ошибок и граничных значений;
- важной бизнес-логики.

**Не тестируем:**

- простой проброс props;
- статическую разметку без поведения;
- внутреннюю реализацию сторонних библиотек;
- константы без логики;
- CSS-классы сами по себе.

_Unit-тест располагается рядом с модулем:_

```text
src/shared/api/client.test.ts
src/shared/lib/cn.test.ts
```

<u>В unit-тестах запрещены реальные API-запросы. `fetch`, переменные окружения,
время и другие внешние зависимости подменяются через Vitest.</u>

## Integration-тесты

Integration-тест проверяет совместную работу нескольких частей приложения.

**Такие тесты пишем для:**

- форм с валидацией и отправкой;
- интерактивных компонентов;
- пользовательских действий и изменения состояния;
- связки компонента, хука и API;
- loading-, success- и error-состояний;
- переключения языка и другой важной UI-логики.

_Integration-тест располагается рядом с компонентом или feature:_

```text
src/features/contact-form/ui/contact-form.test.tsx
```

_Предпочтительный порядок поиска элементов:_

1. `getByRole`
2. `getByLabelText`
3. `getByText`
4. `getByTestId` — только если семантического селектора нет.

<u>Для пользовательских действий используется `userEvent`.</u>

## E2E-тесты

E2E-тесты хранятся в корневой директории:

```text
e2e/home.spec.ts
```

**E2E пишем только для критичных пользовательских сценариев:**

- приложение открывается;
- основные страницы доступны;
- пользователь может отправить форму;
- работает основная навигация;
- работает переключение языка;
- корректно отображаются критичные ошибки.

_Не переносим в E2E все проверки компонентов и второстепенные UI-состояния._

**Async Server Components** преимущественно проверяем через E2E, поскольку
Vitest не выполняет их как полноценное Next.js-приложение.

## Общая инфраструктура

```text
tests/setup/vitest.setup.ts
tests/mocks/server-only.ts
vitest.config.mts
playwright.config.ts
```

## Команды

| Команда                 | Назначение                                          |
| ----------------------- | --------------------------------------------------- |
| `npm test`              | Запускает Vitest в watch-режиме                     |
| `npm run test:run`      | Один раз запускает unit- и integration-тесты        |
| `npm run test:coverage` | Запускает Vitest и создаёт отчёт о покрытии         |
| `npm run test:e2e`      | Собирает приложение и запускает Playwright          |
| `npm run test:e2e:ui`   | Открывает интерактивный интерфейс Playwright        |
| `npm run test:all`      | Запускает Vitest и E2E                              |
| `npm run check`         | Проверяет типы, lint, форматирование, тесты и build |

## Правила

- тест называется `<module>.test.ts` или `<module>.test.tsx`;
- E2E-сценарий называется `<scenario>.spec.ts`;
- один тест проверяет одно наблюдаемое поведение;
- тесты не зависят от порядка выполнения;
- секретные значения из `.env` не используются;
- реальные API-запросы в unit- и integration-тестах не выполняются;
- snapshots не используются для больших компонентов и страниц;
- coverage применяется как индикатор, а не как самоцель.

## Continuous Integration

CI реализован через GitHub Actions и настроен в:

```text
.github/workflows/ci.yml
```

При CI запусаются:

```bash
npm ci
npm run typecheck
npm run lint
npm run format:check
npm run test:run
npm run build
npx playwright install --with-deps chromium
npx playwright test
```

**Проверяются:**

- корректность TypeScript;
- правила ESLint;
- форматирование Prettier;
- unit- и integration-тесты;
- production-сборка Next.js;
- критичные E2E-сценарии в Chromium.

<u>_Если E2E-тест падает, GitHub Actions сохраняет Playwright report и результаты тестов как artifact на 7 дней._</u>

<u>_При появлении нового коммита предыдущий незавершённый запуск того же Pull Request отменяется._</u>

## Источники

- https://nextjs.org/docs/app/guides/testing/vitest
- https://nextjs.org/docs/app/guides/testing/playwright
- https://vitest.dev/config/
- https://testing-library.com/docs/guiding-principles/
- https://playwright.dev/docs/test-webserver
- https://docs.github.com/en/actions
- https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run
- https://docs.github.com/en/actions/how-tos/write-workflows/control-workflow-concurrency
- https://playwright.dev/docs/ci
