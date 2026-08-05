# Code Style

Данный документ описывает правила написания кода в проекте.

## Содержание

- [Именование файлов и папок](#именование-файлов-и-папок)
- [Константы](#константы)
- [Переменные](#переменные)
- [React-компоненты](#react-компоненты)
- [Функции](#функции)
- [React Hooks](#react-hooks)
- [Git Branch Naming](#git-branch-naming)
- [CSS](#css)
- [TypeScript](#typescript)

---

## Именование файлов и папок

Используем `kebab-case`.

```
user-profile.tsx
app-routes.ts
auth-service.ts
```

---

## Константы

Глобальные константы пишем в формате `SNAKE_CASE`.

```typescript
const API_URL = "/api";
const MAX_RETRY_COUNT = 3;
```

---

## Переменные

Локальные переменные и значения внутри функций пишем в `camelCase`.

```typescript
const userName = "Alex";
```

---

## React-компоненты

Для React-компонентов используем `PascalCase`. Название файла должно соответствовать названию компонента.

```typescript
const UserProfileCard = () => {
  return <div>User</div>;
};
```

---

## Функции

Используем `camelCase`. Название функции должно отражать её назначение.

```typescript
const getUserData = () => {};
const calculateTotalPrice = () => {};
```

---

## React Hooks

Используем `camelCase` с префиксом `use`.

```typescript
const useAuth = () => {};
```

---

## Git Branch Naming

Название новых веток создаём по названию задачи из ClickUp.

**Формат:** `feature/task-name`

**Пример:**

Задача — _"Prepare assets from project"_
Ветка — `feature/prepare-assets-from-project`

---

## CSS

Для названия CSS-классов используем `snake_case`.

```css
.user_profile_card {
}
```

Для обозначения активного состояния используем модификатор через `--`.

```css
.user_profile_card--active {
}
```

Для названия файла CSS-модуля используем `kebab-case`.

```
user-profile.module.css
```

---

## TypeScript

### Interfaces

Не используем венгерскую нотацию.

```typescript
interface User {
  name: string;
  age: number;
}
```

❌ **Плохо:**

```typescript
interface ObjUser {}
```

### Type

Используется для:

- union-типов
- сложных типов
- комбинаций типов

```typescript
type Name = "Alex" | "Olga" | "Max";
type Status = "loading" | "success" | "error";
```

### Типизация компонентов

Для типизации пропсов компонентов используем `interface`.

Если интерфейс используется только внутри одного компонента и не переиспользуется в других местах — называем его `Props`.

```typescript
interface Props {
  name: string;
  age: number;
}

const UserCard = ({ name, age }: Props) => {};
```

### Типизация параметров функций

Если интерфейс используется только одной функцией и не переиспользуется — называем его `Params`.

```typescript
interface Params {
  userId: string;
}

const getUser = ({ userId }: Params) => {};
```
