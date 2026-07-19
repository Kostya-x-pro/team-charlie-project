Данный документ описывает правила написания кода в проекте

---

Общее правила именования файлов и папок

Используем kebab-case

user-profile.tsx
app-routes.ts
auth-service.ts

---

Константы

Глобальные константы пишем в формате SNAKE_CASE

const API_URL = '/api';
const MAX_RETRY_COUNT = 3;

---

Локальные переменные и значения внутри функций пишем в camelCase.

const userName = 'Alex';

---

React компоненты

Для React компонентов используем PascalCase (Название файла должно соответствовать названию компонента)

const UserProfileCard = () => {
return <div>User</div>;
};

---

Функции

Используем camelCase (Название функций должно отвечать их сущности)

const getUserData = () => {};
const calculateTotalPrice = () => {};

---

React Hooks

Используем формат camelCase с префиксом use

const useAuth = () => {};

---

Git Branch Naming

Название новых веток создаём по названию задачи из ClickUp

Формат: feature/task-name

К примеру есть задача - Prepare assets from project
Тогда ветка будет => feature/prepare-assets-from-project

---

CSS

Для названия CSS классов используем snake_case.

.user_profile_card {
}

Для обозначения активности класса используем "--"

.user_profile_card--active {
}

Для названия css модуля ипользуем kebab-case

user-profile.module.css

---

TypeScript

---

Interfaces

Не используем венгерскую нотацию

interface User {
name: string;
age: number;
}

ПЛОХО => interface ObjUser {}

---

Type

Используется для: - union типов - сложных типов - комбинаций типов

type Name = 'Alex' | 'Olga' | 'Max';
type Status = 'loading' | 'success' | 'error';

---

Типизация компонентов

Для типизации пропсов компонентов используем interfaces.

Если интерфейс используется только внутри одного компонента и не переиспользуется в других местах, называем его Props

interface Props {
name: string;
age: number;
}

const UserCard = ({ name, age }: Props) => {
};

---

Типизация параметров функцый

Если интерфейс используется только одной функцией и не переиспользуется, называем его Params

Пример:

interface Params {
userId: string;
}

const getUser = ({ userId }: Params) => {};
