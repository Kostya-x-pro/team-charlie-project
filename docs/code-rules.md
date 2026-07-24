# Code Rules

## TypeScript

Проект использует строгий TypeScript.

Основные правила:

- `strict` всегда включен.
- `allowJs` выключен.
- Неиспользуемые локальные переменные и параметры запрещены.
- Для индексации массивов и объектов учитываем `undefined`, потому что включен `noUncheckedIndexedAccess`.
- Пользовательские object-shaped типы описываем через `interface`.
- Union-типы и utility-типы описываем через `type`.
- Использование `any` запрещено. Вместо него используем точные типы, generics, `unknown` или другие подходящие средства типизации.

## Global Types

`next-env.d.ts` не редактируем вручную.

Этот файл генерируется Next.js автоматически и содержит системные типы фреймворка.

Пользовательские глобальные декларации пишем в `global-types.d.ts`.

Примеры:

- декларации для `*.svg`;
- глобальные типы окружения, если они действительно нужны проекту.

Обычные типы фич, сущностей и компонентов не выносим в `global-types.d.ts`.

## ESLint

ESLint работает поверх стандартной конфигурации Next.js:

- `eslint-config-next/core-web-vitals`;
- `eslint-config-next/typescript`.

Дополнительно используются правила для:

- дублей импортов;
- циклических импортов;
- self-import;
- порядка импортов;
- FSD boundaries;
- public API импортов.
- react-hooks запрещает нарушать правила хуков.
- react-hooks/exhaustive-deps предупреждает о неполных зависимостях в массиве хука.
- react-refresh предупреждает, если файл с React-компонентами экспортирует значения, которые могут мешать Fast Refresh.

## FSD Layers

Порядок слоев:

```text
app -> fsd-pages -> widgets -> features -> entities -> shared
```

Нижний слой не может импортировать верхний.

Примеры:

```ts
// Разрешено
// Запрещено
import { AuthForm } from '@/features/auth/ui/AuthForm';

import { Button } from '@/shared/ui/button';
```

Импортировать другие slices можно только через public API.

Примеры:

```ts
// Разрешено
import { AuthForm } from '@/features/auth';

// Запрещено
import { AuthForm } from '@/features/auth/ui/AuthForm';
```

## FSD Pages Layer

В классическом FSD слой называется `pages`.

В этом проекте физическая папка называется `src/fsd-pages`, потому что `src/pages` зарезервирована Next.js Pages Router.

Route-файлы Next.js остаются в `src/app`.

Пример:

```ts
// src/app/page.tsx
export { HomePage as default } from '@/fsd-pages/home-page';
```

## Class Names

Для сборки `className` используем только helper `cn`.

```ts
import { cn } from '@/shared/lib/cn';
```

Условные классы пишем через `&&`.

```tsx
<div className={cn(styles.card, isActive && styles.card_active)} />
```

Не используем тернарный оператор, если нет альтернативного класса.

```tsx
// bad
<div className={cn(styles.card, isActive ? styles.card_active : '')} />
```

Тернарный оператор допустим, когда необходимо выбрать один из двух классов.

```tsx
// Разрешено
<div className={cn(isPrimary ? styles.primary : styles.secondary)} />
```

Прямой импорт `clsx` разрешен только внутри `src/shared/lib/cn`.

Пакет `classnames` не используется.

## Prettier

Prettier отвечает только за форматирование.

Основные правила:

- одинарные кавычки;
- точки с запятой;
- висячие запятые;
- Ширина строки: 80 (возможно увеличим до 100);
- сортировка импортов по слоям проекта.

Порядок импортов:

1. `react`
2. `next`
3. `external packages`
4. `app`
5. `fsd-pages`
6. `widgets`
7. `features`
8. `entities`
9. `shared`
10. `relative imports`
11. `styles`

## App Router

`src/app` принадлежит Next.js App Router.

В `src/app` храним только route-level файлы Next.js:

- `page.tsx`;
- `layout.tsx`;
- `route groups`;
- `route handlers`;

<!-- ToDo Возможно стоит подумать над этим -->
<!-- - `loading.tsx`;
- `error.tsx`;
- `not-found.tsx`; -->

Основную UI-логику выносим в FSD-слои.

## CI/CD Notes

CI/CD пока не настроен, однако проект должен быть готов к следующим проверкам:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

Перед merge все эти команды должны проходить без ошибок.

## Sources

- Next.js TypeScript: https://nextjs.org/docs/app/api-reference/config/typescript
- Next.js ESLint: https://nextjs.org/docs/app/api-reference/config/eslint
- Next.js src folder: https://nextjs.org/docs/app/api-reference/file-conventions/src-folder
- ESLint flat config: https://eslint.org/docs/latest/use/configure/configuration-files
- Prettier configuration: https://prettier.io/docs/configuration
- React Hooks ESLint plugin: https://react.dev/reference/eslint-plugin-react-hooks
- React Refresh ESLint plugin: https://github.com/ArnaudBarre/eslint-plugin-react-refresh

---

Version: 1.01
Последнее обновление: 19-07-2026
